import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { EditExperienceStructure, ExperienceInterface, ExperienceType } from '@app/types/Experience'
import { LocaleStore } from '@app/types/Locale'

import { faTable, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as EXPERIENCE_ACTIONS from '@store_actions/Experience'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import { buildDataMap } from '@app/ui/dialog/helpers'
import * as INPUT_HELPERS from './inputHelpers'

type StoreType = { locale: LocaleStore } & {experience: { professional: ExperienceInterface[] } & { ong: ExperienceInterface[] } & { other: ExperienceInterface[] } }
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  ExperienceType                                                            = ExperienceType
  cardIcon: IconDefinition                                                  = faTable
  type: ExperienceType                                                      = null
  inputData                                                                 = INPUT_HELPERS
  data$: Partial<Record<ExperienceType, Observable<ExperienceInterface[]>>> = {}
  data: Partial<Record<ExperienceType, ExperienceInterface[]>>              = {}
  @Input() title: string                                                    = 'Experience'

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor( private activatedRoute: ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in ExperienceType)) {
        this.type = ExperienceType.all
      } else {
        this.type = ExperienceType[passedType]
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.prepareDataSubscriptions('experience')
  }

  private prepareDataSubscriptions(storeKey: string) {
    for (let type in ExperienceType) { // type here is string, ExpertienceType[type] will be a number in common enums
      if (type === ExperienceType[ExperienceType.all]) continue
      this.data$[ExperienceType[type]] = this.store.pipe(select(state => state?.[storeKey]?.[type]))
      this.data$[ExperienceType[type]].subscribe((data: ExperienceInterface[]) => data ? this.data[ExperienceType[type]] = data : null)
    }
  }

  dispatchSave = ( data, type ) => this.store.dispatch(EXPERIENCE_ACTIONS.SAVE_EXPERIENCES({ experiences: data, experienceType: type }))
  add = ( data: ExperienceInterface )  => this.editValues(this.data[data.type].length, { ...data, language: this.selectedLocale, order: this.data[data.type].length })
  isEdit = ( data: ExperienceInterface | EditExperienceStructure | Object = {} ): data is EditExperienceStructure => (data as EditExperienceStructure).index !== undefined
  getTypeName = ( type: ExperienceType ) => ExperienceType[type]
  isActive = (experience: string) => this.type === ExperienceType.all || this.type === ExperienceType[experience]
  edit = ( type: string ) => (index) => this.openDialog(type, index)
  editValues = ( index: number, experienceData: ExperienceInterface ) => this.dispatchSave([ ...this.data[ExperienceType[experienceData.type]].slice(0, index), { ...experienceData}, ...this.data[ExperienceType[experienceData.type]].slice(index + 1) ], experienceData.type)

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => { this.selectedLocale = data; this.fetchData() })
    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  openDialog( type: string, index: number = 0 ): void {
    const data = buildDataMap(this.data[ExperienceType[type]], index, INPUT_HELPERS, this.title, type)
    const dialogRef = this.matDialog.open(DialogComponent, { height: '80%', maxHeight: '100%', width: '80%', data })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
      if (result) {
        if (this.isEdit(result)) {
          const { index, experience } = result
          this.editValues(index, { ...experience, language: this.selectedLocale, order: index })
        } else {
          this.add(result)
        }
      }
    })
  }

  onDrop( event: CdkDragDrop<ExperienceInterface[]> ) {
    const type = event.item.data.type
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this.data[ExperienceType[type]]]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentExperience, indexInArr): ExperienceInterface  => {
        return {...currentExperience, order: indexInArr}
      })

      this.dispatchSave(newArr, type)
    }
  }

  openRemovalConfirmDialog( index: number, type: ExperienceType ): void {
    const experience = this.data[type][index]
    const dialogRef = this.matDialog.open(ConfirmComponent, { width: '80%', data: { index, element: experience, nameKey: 'role', superType: 'experience', action: 'delete' } })

    dialogRef.afterClosed().subscribe(({
      index = null,
      element: {type = null} = {},
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(index)}` : '');
      if (index !== null && type !== null) this.delete(type)(index)
    })
  }

  delete = (type: ExperienceType ) => ( index: number ) => {
    const experience = this.data[ExperienceType[type]][index]
    this.store.dispatch(EXPERIENCE_ACTIONS.REMOVE_EXPERIENCE({ id: experience.id, experienceType: type.toString() }))
  }

  fetchData() {
    if (this.type !== ExperienceType.all) {
      this.store.dispatch(EXPERIENCE_ACTIONS.FETCH_EXPERIENCE({ language: this.selectedLocale, experienceType: ExperienceType[this.type] }))
    } else {
      Object.values(ExperienceType).filter((type) => typeof type === 'string' ).forEach((type: string) => {
        type !== ExperienceType[ExperienceType.all] && this.store.dispatch(EXPERIENCE_ACTIONS.FETCH_EXPERIENCE({ language: this.selectedLocale, experienceType: type }))
      })
    }
  }
}