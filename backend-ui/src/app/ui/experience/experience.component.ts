import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { EditExperienceStructure, ExperienceInterface, ExperienceType } from '@app/types/Experience'
import { LocaleStore } from '@app/types/Locale'

import {
  faArrowsAlt,
  faEdit,
  faTable,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as EXPERIENCE_ACTIONS from '@store_actions/Experience'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { ExperienceDialogComponent } from './experience-dialog.component'

type StoreType = { locale: LocaleStore } & {experience: { professional: ExperienceInterface[] } & { ong: ExperienceInterface[] } & { other: ExperienceInterface[] }}
@Component({
  selector: 'app-training',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  faArrowsAlt: IconDefinition = faArrowsAlt
  faEdit: IconDefinition = faEdit
  cardIcon: IconDefinition = faTable
  faTrash: IconDefinition = faTrash

  type: ExperienceType = null;

  colsToRender = [
    // 'id',
    'role',
    'company',
    'edit',
    'delete',
    'order',
  ]

  // initial state of dragging for reordering working experience
  dragDisabled: boolean = true

  professionalData: ExperienceInterface[] = []
  professionalData$: Observable<ExperienceInterface[]>
  ongData: ExperienceInterface[] = []
  ongData$: Observable<ExperienceInterface[]>
  otherData: ExperienceInterface[] = []
  otherData$: Observable<ExperienceInterface[]>

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  @Input() title: string = 'Experience'

  constructor(private activatedRoute:ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in ExperienceType)) {
        this.type = ExperienceType.all
      } else {
        this.type = ExperienceType[passedType]
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))

    this.professionalData$ = this.store.pipe(select(state => state?.experience?.professional))
    this.ongData$ = this.store.pipe(select(state => state?.experience?.ong))
    this.otherData$ = this.store.pipe(select(state => state?.experience?.other))
  }

  public isExperienceActive(experience: string) {
    return this.type === ExperienceType.all
            || this.type === ExperienceType[experience]
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data)

    this.professionalData$.subscribe((data: ExperienceInterface[]) => data ? this.professionalData = data : null)
    this.ongData$.subscribe((data: ExperienceInterface[]) => data ? this.ongData = data : null)
    this.otherData$.subscribe((data: ExperienceInterface[]) => data ? this.otherData = data : null)

    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  getExperienceTypeName(type: ExperienceType) {
    return ExperienceType[type]
  }

  openExperienceDialog(data: EditExperienceStructure | string): void {
    const dialogRef = this.matDialog.open(ExperienceDialogComponent, {
      width: '80%',
      data
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (result) {
        if (this.isExperienceEdit(result)) {
          const {
            index,
            experience
          } = result
          this.editExperienceValues(index, {
            ...experience,
            language: this.selectedLocale,
            order: index
          })
        } else {
          this.addExperience(result)
        }
      }
    })
  }

  onDragStart($event) {
    const draggingElement: HTMLElement = document.querySelector('mat-row.cdk-drag-preview')
    if (draggingElement) {
      draggingElement.style['box-shadow'] =
        `0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12)`
    }
  }

  onDrop(event: CdkDragDrop<ExperienceInterface[]>) {
    this.dragDisabled = true
    const type = event.item.data.type
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this[`${type}Data`]]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentTraining, indexInArr): ExperienceInterface  => {
        return {...currentTraining, order: indexInArr}
      })

      this.dispatchSave(newArr, type)
    }
  }

  getExperienceSource(type: ExperienceType) {
    return this[`${ExperienceType[type]}Data`]
  }

  get ExperienceType() {
    return ExperienceType
  }

  openExperienceRemovalConfirmDialog(experienceIndex: number, type: ExperienceType): void {
    const experience = this[`${ExperienceType[type]}Data`][experienceIndex]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        index: experienceIndex,
        element: experience,
        keyName: 'role',
        superType: 'experience',
        action: 'delete'
      }
    })

    dialogRef.afterClosed().subscribe(({
      index = null,
      element: {type = null} = {},
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(index)}` : '');

      if (index !== null && type !== null) {
        this.deleteExperience(index, type)
      }

    })
  }

  editExperience(index: number, type: string) {
    const experience = this[`${type}Data`][index]
    this.openExperienceDialog({
      experience,
      index
    })
  }


  deleteExperience(trainingIndex: number, type: ExperienceType) {
    const experience = this[`${type}Data`][trainingIndex]
    this.store.dispatch(EXPERIENCE_ACTIONS.REMOVE_EXPERIENCE({
      id: experience.id,
      experienceType: type.toString()
    }))
  }

  isExperienceEdit(data: ExperienceInterface | EditExperienceStructure | Object = {}): data is EditExperienceStructure {
    return (data as EditExperienceStructure).index !== undefined
  }

  editExperienceValues(index: number, experienceData: ExperienceInterface) {
    const dataIndex = `${experienceData.type}Data`
    const newTrainings = [
      ...this[dataIndex].slice(0, index),
      { ...experienceData},
      ...this[dataIndex].slice(index + 1)
    ];
    this.dispatchSave(newTrainings, experienceData.type)
  }

  addExperience(experienceData: ExperienceInterface) {
    this.editExperienceValues(this[`${experienceData.type}Data`].length, {
      ...experienceData,
      language: this.selectedLocale,
      order: this[`${experienceData.type}Data`].length
    })
  }

  dispatchSave(data, type) {
    this.store.dispatch(EXPERIENCE_ACTIONS.SAVE_EXPERIENCES({
      experiences: data,
      experienceType: type
    }))
  }

  fetchData() {
    if (this.type !== ExperienceType.all) {
      this.store.dispatch(EXPERIENCE_ACTIONS.FETCH_EXPERIENCE({
        language: this.selectedLocale,
        experienceType: ExperienceType[this.type]
      }))
    } else {
      Object.values(ExperienceType).filter((type) => typeof type === 'string' ).forEach((type: string) => {
        type !== ExperienceType[ExperienceType.all] && this.store.dispatch(
          EXPERIENCE_ACTIONS.FETCH_EXPERIENCE({
            language: this.selectedLocale,
            experienceType: type
          })
        )
      })
    }
  }

}
