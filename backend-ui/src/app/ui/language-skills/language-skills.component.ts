import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import * as LANGUAGE_ACTIONS from '@store_actions/Languages'
import { faArrowsAlt, faEdit, faTable, faTrash } from '@fortawesome/free-solid-svg-icons'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { TranslationService } from '@app/services/translation/translation.service'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { LocaleStore } from '@app/types/Locale'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { EditLanguageStructure, LanguageInterface } from '@app/types/Languages'
import { LanguageDialogComponent } from './language-skills-dialog.component'
import { SkillsType } from '@app/types'

type StoreType = { locale: LocaleStore } & { languages: { list: LanguageInterface[] } }

@Component({
  selector: 'app-language-skills',
  templateUrl: './language-skills.component.html',
  styleUrls: ['./language-skills.component.scss']
})
export class LanguageSkillsComponent implements OnInit {

  faArrowsAlt: IconDefinition                         = faArrowsAlt
  faEdit: IconDefinition                              = faEdit
  cardIcon: IconDefinition                            = faTable
  faTrash: IconDefinition                             = faTrash

  languageColsToRender                                = [ 'name', 'certification', 'school', 'edit', 'delete', 'order']

  languageData$: Observable<LanguageInterface[]>
  languageData: LanguageInterface[]                   = []

  // initial state of dragging for reordering skills
  dragDisabled: boolean = true

  translationsToRequest                               = ['Language deleted successfully']
  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor( private store: Store<StoreType>, private matDialog: MatDialog, private translate: TranslationService ) {
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.languageData$ = this.store.pipe(select(state => state?.languages?.list))
    this.translate.prefetch(this.translationsToRequest, this)
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => {
      this.selectedLocale = data
      this.fetchData()
    })

    this.languageData$.subscribe((data: LanguageInterface[]) => data ? this.languageData = data : null)
  }

  fetchData = () => this.store.dispatch(LANGUAGE_ACTIONS.FETCH_LANGUAGES({ language: this.selectedLocale }))

  openLanguageDialog( data?: EditLanguageStructure ): void {
    const dialogRef = this.matDialog.open(LanguageDialogComponent, {
      width: '80%',
      data
    })

    dialogRef.afterClosed().subscribe((result: LanguageInterface | EditLanguageStructure) => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
      if (result) {
        if (this.isLanguageEdit(result)) {
          const {
            index,
            language
          } = result
          this.editLanguageValues(index, {
            ...language,
            language: this.selectedLocale,
            order: index
          })
        } else {
          this.addLanguage(result)
        }
      }
    })
  }

  isLanguageEdit = ( data: LanguageInterface | EditLanguageStructure | Object = {} ): data is EditLanguageStructure => (data as EditLanguageStructure).index !== undefined

  editLanguage( index: number ) {
    const type = SkillsType[SkillsType.language]
    const language = this[`${type}Data`][index]
    this.openLanguageDialog({
      language,
      index
    })
  }

  editLanguageValues( index: number, languageData: LanguageInterface ) {
    const dataIndex = 'languageData'
    const newLanguages = [
      ...this[dataIndex].slice(0, index),
      { ...languageData},
      ...this[dataIndex].slice(index + 1)
    ];
    this.dispatchLanguageSave(newLanguages)
  }

  dispatchLanguageSave( data ) {
    const curatedData = data.map(language => {
      return {
        ...language,
        ...(language.written_level ? {written_level: Number(language.written_level)} : {}),
        ...(language.spoken_level ? {spoken_level: Number(language.spoken_level)} : {}),
      }
    })
    this.store.dispatch(LANGUAGE_ACTIONS.SAVE_LANGUAGES({
      languages: curatedData,
    }))
  }

  addLanguage( languageData: LanguageInterface ) {
    const dataIndex = 'languageData'
    this.editLanguageValues(this[dataIndex].length, {
      ...languageData,
      language: this.selectedLocale,
      order: this[dataIndex].length
    })
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

  onDrop( event: CdkDragDrop<LanguageInterface[]> ) {
    this.dragDisabled = true
    const type = SkillsType[SkillsType.language]
    if (event.previousIndex !== event.currentIndex) {
      const currentArr = [...this[`${type}Data`]]
      moveItemInArray(currentArr, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      const newArr = currentArr.map((currentSkills, indexInArr): LanguageInterface  => {
        return {...currentSkills, order: indexInArr}
      })
      this.dispatchLanguageSave(newArr)
    }
  }

  openRemovalConfirmDialog( index: number ): void {
    const type = SkillsType[SkillsType.language]
    const language = this[`${type}Data`][index]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        index,
        element: language,
        nameKey: 'name',
        superType: 'language',
        action: 'delete'
      }
    })

    dialogRef.afterClosed().subscribe(({
      index = null,
      element = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(element)}` : '');

      if (index !== null) {
        this.deleteLanguage(index)
      }

    })
  }

  deleteLanguage( index: number ) {
    const type = SkillsType[SkillsType.language]
    const language = this[`${type}Data`][index]
    this.store.dispatch(LANGUAGE_ACTIONS.REMOVE_LANGUAGE({ id: language.id }))
  }
}