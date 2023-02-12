import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { EditSkillsStructure, SkillInterface, SkillsType } from '@app/types/Skills'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as SKILLS_ACTIONS from '@store_actions/Skills'

import { faArrowsAlt, faEdit, faTable, faTrash } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { SkillsDialogComponent } from './skills-dialog.component'
import { TranslationService } from '@app/services/translation/translation.service'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { LocaleStore } from '@app/types/Locale'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

type StoreType = { locale: LocaleStore } & {skills: { general: SkillInterface[] } & { computer: SkillInterface[] } }
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  faArrowsAlt: IconDefinition                         = faArrowsAlt
  faEdit: IconDefinition                              = faEdit
  cardIcon: IconDefinition                            = faTable
  faTrash: IconDefinition                             = faTrash

  type: SkillsType                                    = null

  colsToRender                                        = [ 'tag', 'description', 'school', 'average_grade', 'edit', 'delete', 'order' ]

  generalData$: Observable<SkillInterface[]>
  generalData: SkillInterface[]                       = []
  computerData$: Observable<SkillInterface[]>
  computerData: SkillInterface[]                      = []

  // initial state of dragging for reordering skills
  dragDisabled: boolean = true

  translationsToRequest                               = ['Skills deleted successfully']
  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor( private activatedRoute: ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog, private translate: TranslationService ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in SkillsType)) {
        this.type = SkillsType.all
      } else {
        this.type = SkillsType[passedType]
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.generalData$ = this.store.pipe(select(state => state?.skills?.general))
    this.computerData$ = this.store.pipe(select(state => state?.skills?.computer))
    this.translate.prefetch(this.translationsToRequest, this)
  }

  public isSkillsActive = ( skillType: string ) => this.type === SkillsType.all || this.type === SkillsType[skillType]

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => {
      this.selectedLocale = data
      this.fetchData()
    })
    this.generalData$.subscribe((data: SkillInterface[]) => data ? this.generalData = data : null)
    this.computerData$.subscribe((data: SkillInterface[]) => data ? this.computerData = data : null)
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

  openSkillDialog( data: EditSkillsStructure | string ): void {
    const dialogRef = this.matDialog.open(SkillsDialogComponent, {
      width: '80%',
      data
    })

    dialogRef.afterClosed().subscribe((result: SkillInterface | EditSkillsStructure) => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
      if (result) {
        if (this.isSkillsEdit(result)) {
          const {
            index,
            skill
          } = result
          this.editSkillsValues(index, {
            ...skill,
            language: this.selectedLocale,
            order: index
          })
        } else {
          this.addSkills(result)
        }
      }
    })
  }

  isSkillsEdit = ( data: SkillInterface | EditSkillsStructure | Object = {} ): data is EditSkillsStructure => (data as EditSkillsStructure).index !== undefined

  editSkillsValues( index: number, skillsData: SkillInterface ) {
    const dataIndex = `${skillsData.type}Data`
    const newSkills = [
      ...this[dataIndex].slice(0, index),
      { ...skillsData},
      ...this[dataIndex].slice(index + 1)
    ]
    this.dispatchSave(newSkills, skillsData.type)
  }

  dispatchSave( data, type ) {
    const curatedData = data.map(skill => {
      return {...skill, ...(skill.skill_level ? {skill_level: Number(skill.skill_level)} : {})}
    })
    this.store.dispatch(SKILLS_ACTIONS.SAVE_SKILLS({
      skills: curatedData,
      skillType: type
    }))
  }

  editSkill( index: number, type: string ) {
    const skill = this[`${type}Data`][index]
    this.openSkillDialog({
      skill,
      index
    })
  }

  addSkills( skillsData: SkillInterface ) {
    this.editSkillsValues(this[`${skillsData.type}Data`].length, {
      ...skillsData,
      language: this.selectedLocale,
      order: this[`${skillsData.type}Data`].length
    })
  }

  get SkillsType() {
    return SkillsType
  }

  getSkillTypeName = ( type: SkillsType ) => SkillsType[type]

  getSkillsSource = ( type: SkillsType ) => this[`${SkillsType[type]}Data`]

  openSkillsRemovalConfirmDialog( skillsIndex: number, type: SkillsType ): void {
    const skill = this[`${SkillsType[type]}Data`][skillsIndex]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        index: skillsIndex,
        element: skill,
        nameKey: 'tag',
        superType: 'skill',
        action: 'delete'
      }
    })

    dialogRef.afterClosed().subscribe(({
      index = null,
      element = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(element)}` : '');

      if (index !== null) {
        this.deleteSkills(index, type)
      }
    })
  }

  deleteSkills( skillsIndex: number, type: SkillsType ) {
    const skills = this[`${SkillsType[type]}Data`][skillsIndex]
    this.store.dispatch(SKILLS_ACTIONS.REMOVE_SKILL( { id: skills.id, skillType: SkillsType[type] }) )
  }

  onDragStart( _$event ) {
    const draggingElement: HTMLElement = document.querySelector('mat-row.cdk-drag-preview')
    if (draggingElement) {
      draggingElement.style['box-shadow'] =
        `0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12)`
    }
  }

  onDrop( event: CdkDragDrop<SkillInterface[]> ) {
    this.dragDisabled = true
    const type = event.item.data.type
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this[`${type}Data`]]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentSkills, indexInArr): SkillInterface  => {
        return {...currentSkills, order: indexInArr}
      })
      this.dispatchSave(newArr, type)
    }
  }
}
