import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { EditSkillsStructure, SkillInterface, SkillsType } from '@app/types/Skills'
import { faTable, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

import * as SKILLS_ACTIONS from '@store_actions/Skills'
import { logEasy } from '@app/services/logging'
// import { DialogComponent } from '@app/ui/dialog/dialog.component'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { LocaleStore } from '@app/types/Locale'
import * as INPUT_HELPERS from './inputHelpers'

type StoreType = { locale: LocaleStore } & {skills: { general: SkillInterface[] } & { computer: SkillInterface[] } }
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  SkillsType                                                        = SkillsType
  cardIcon: IconDefinition                                          = faTable
  type: SkillsType                                                  = null
  inputData                                                         = INPUT_HELPERS
  data$: Partial<Record<SkillsType, Observable<SkillInterface[]>>>  = {}
  data: Partial<Record<SkillsType, SkillInterface[]>>               = {}

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor( private activatedRoute: ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in SkillsType)) {
        this.type = SkillsType.all
      } else {
        this.type = SkillsType[passedType]
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.prepareDataSubscriptions('skills')
  }

  private prepareDataSubscriptions(storeKey: string) {
    for (let type in SkillsType) { // type here is string, ExpertienceType[type] will be a number in common enums
      if (type === SkillsType[SkillsType.all]) continue
      this.data$[SkillsType[type]] = this.store.pipe(select(state => state?.[storeKey]?.[type]))
      this.data$[SkillsType[type]].subscribe((data: SkillInterface[]) => data ? this.data[SkillsType[type]] = data : null)
    }
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => { this.selectedLocale = data; this.fetchData() })
    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  fetchData() {
    if (this.type !== SkillsType.all) {
      this.store.dispatch(SKILLS_ACTIONS.FETCH_SKILLS( { language: this.selectedLocale, skillType: SkillsType[this.type] }) )
    } else {
      Object.values(SkillsType).filter((type) => typeof type === 'string' ).forEach((type: string) => {
        type !== SkillsType[SkillsType.all] && this.store.dispatch( SKILLS_ACTIONS.FETCH_SKILLS({ language: this.selectedLocale, skillType: type }) )
      })
    }
  }

  openDialog( type: string, index: number = 0 ): void {
    /*
    const dialogRef = this.matDialog.open(DialogComponent, { width: '80%', data })

    dialogRef.afterClosed().subscribe((result: SkillInterface | EditSkillsStructure) => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
      if (result) {
        if (this.isEdit(result)) {
          const { index, skill } = result
          this.editValues(index, { ...skill, language: this.selectedLocale, order: index })
        } else {
          this.add(result)
        }
      }
    })
    */
  }

  isActive = ( skillType: string ) => this.type === SkillsType.all || this.type === SkillsType[skillType]
  isEdit = ( data: SkillInterface | EditSkillsStructure | Object = {} ): data is EditSkillsStructure => (data as EditSkillsStructure).index !== undefined
  editValues = ( index: number, data: SkillInterface ) => this.dispatchSave([ ...this.data[SkillsType[data.type]].slice(0, index), { ...data}, ...this.data[SkillsType[data.type]].slice(index + 1) ], data.type)
  edit = ( type: string ) => ( index: number ) => this.openDialog( type, index )
  add = ( data: SkillInterface ) => this.editValues(this.data[data.type].length, {...data, language: this.selectedLocale, order: this.data[data.type].length })
  getTypeName = ( type: SkillsType ) => SkillsType[type]

  dispatchSave( data, type ) {
    const curatedData = data.map(skill => {
      return {...skill, ...(skill.skill_level ? {skill_level: Number(skill.skill_level)} : {})}
    })
    this.store.dispatch(SKILLS_ACTIONS.SAVE_SKILLS({ skills: curatedData, skillType: type }))
  }

  openRemovalConfirmDialog( index: number, type: SkillsType ): void {
    const skill = this.data[SkillsType[type]][index]
    const dialogRef = this.matDialog.open(ConfirmComponent, { width: '80%', data: { index, element: skill, nameKey: 'tag', superType: 'skill', action: 'delete' } })

    dialogRef.afterClosed().subscribe(({
      index = null,
      element = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(element)}` : '');
      if (index !== null) this.delete(type)(index)
    })
  }

  delete = ( type: SkillsType ) => ( index: number ) => {
    const skills = this.data[SkillsType[type]][index]
    this.store.dispatch(SKILLS_ACTIONS.REMOVE_SKILL( { id: skills.id, skillType: SkillsType[type] }) )
  }

  onDrop( event: CdkDragDrop<SkillInterface[]> ) {
    const type = event.item.data.type
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this.data[SkillsType[type]]]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentSkills, indexInArr): SkillInterface  => {
        return {...currentSkills, order: indexInArr}
      })
      this.dispatchSave(newArr, type)
    }
  }
}
