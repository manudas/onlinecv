import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { EditSkillsStructure, SkillInterface, SkillsType } from '@app/types/Skills'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as SKILLS_ACTIONS from '@store_actions/Skills'

import {
  faArrowsAlt,
  faEdit,
  faTable,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { SkillsDialogComponent } from './skills-dialog.component'
import { TranslationService } from '@app/services/translation/translation.service'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { LocaleStore } from '@app/types/Locale'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'


type StoreType = { locale: LocaleStore } & {skills: { official: SkillInterface[] } & { computer: SkillInterface[] } & { other: SkillInterface[] }}
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  faArrowsAlt: IconDefinition = faArrowsAlt
  faEdit: IconDefinition = faEdit
  faTable: IconDefinition  = faTable
  faTrash: IconDefinition = faTrash

  type: SkillsType = null;

  colsToRender = [
    'id',
    'tag',
    'description',
    'school',
    'average_grade',
    'edit',
    'delete',
    'order',
  ];

  officialData$: Observable<SkillInterface[]>
  officialData: SkillInterface[] = []
  computerData$: Observable<SkillInterface[]>
  computerData: SkillInterface[] = []
  otherData$: Observable<SkillInterface[]>
  otherData: SkillInterface[] = []

  title: string = 'Skills';

  // initial state of dragging for reordering skills
  dragDisabled: boolean = true

  translationsToRequest = ['Skills deleted successfully']
  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor(private activatedRoute:ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog, private translate: TranslationService) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type');
      if (!(passedType in SkillsType)) {
        this.type = SkillsType.all;
      } else {
        this.type = SkillsType[passedType];
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))

    this.officialData$ = this.store.pipe(select(state => state?.skills?.official))
    this.computerData$ = this.store.pipe(select(state => state?.skills?.computer))
    this.otherData$ = this.store.pipe(select(state => state?.skills?.other))

    this.translate.prefetch(this.translationsToRequest, this)

  }

  public isSkillsActive = (skillType: string) => this.type === SkillsType.all || this.type === SkillsType[skillType]

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data)
    this.officialData$.subscribe((data: SkillInterface[]) => data ? this.officialData = data : null)
    this.computerData$.subscribe((data: SkillInterface[]) => data ? this.computerData = data : null)
    this.otherData$.subscribe((data: SkillInterface[]) => data ? this.otherData = data : null)
    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  fetchData() {
    if (this.type !== SkillsType.all) {
      this.store.dispatch(SKILLS_ACTIONS.FETCH_SKILLS({
        language: this.selectedLocale,
        skillType: SkillsType[this.type]
      }))
    } else {
      Object.values(SkillsType).filter((type) => typeof type === 'string' ).forEach((type: string) => {
        type !== SkillsType[SkillsType.all] && this.store.dispatch(
          SKILLS_ACTIONS.FETCH_SKILLS({
            language: this.selectedLocale,
            skillType: type
          })
        )
      })
    }
  }

  openSkillsDialog(data: EditSkillsStructure | string): void {
    const dialogRef = this.matDialog.open(SkillsDialogComponent, {
      width: '80%',
      data
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
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

  isSkillsEdit(data: SkillInterface | EditSkillsStructure | Object = {}): data is EditSkillsStructure {
    return (data as EditSkillsStructure).index !== undefined
  }

  editSkillsValues(index: number, skillsData: SkillInterface) {
    const dataIndex = `${skillsData.type}Data`
    const newSkills = [
      ...this[dataIndex].slice(0, index),
      { ...skillsData},
      ...this[dataIndex].slice(index + 1)
    ];
    this.dispatchSave(newSkills, skillsData.type)
  }

  dispatchSave(data, type) {
    this.store.dispatch(SKILLS_ACTIONS.SAVE_SKILLS({
      skills: data,
      skillType: type
    }))
  }

  editSkills(index: number, type: string) {
    const skill = this[`${type}Data`][index]
    this.openSkillsDialog({
      skill,
      index
    })
  }

  addSkills(skillsData: SkillInterface) {
    this.editSkillsValues(this[`${skillsData.type}Data`].length, {
      ...skillsData,
      language: this.selectedLocale,
      order: this[`${skillsData.type}Data`].length
    })
  }

  get SkillsType() {
    return SkillsType
  }

  getSkillsTypeName(type: SkillsType) {
    return SkillsType[type]
  }

  getSkillsSource(type: SkillsType) {
    return this[`${SkillsType[type]}Data`]
  }

  openSkillsRemovalConfirmDialog(skillsIndex: number, type: SkillsType): void {
    const skills = this[`${SkillsType[type]}Data`][skillsIndex]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        index: skillsIndex,
        skills
      }
    })

    dialogRef.afterClosed().subscribe(({
      indexToRemove = null,
      type = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, indexToRemove !== null ? `The following message was received: ${JSON.stringify(indexToRemove)}` : '');

      if (indexToRemove !== null && type !== null) {
        this.deleteSkills(indexToRemove, type)
      }

    })
  }

  deleteSkills(skillsIndex: number, type: SkillsType) {
    const skills = this[`${type}Data`][skillsIndex]
    this.store.dispatch(SKILLS_ACTIONS.REMOVE_SKILL({
      id: skills.id,
      skillType: type.toString()
    }))
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

  onDrop(event: CdkDragDrop<SkillInterface[]>) {
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
