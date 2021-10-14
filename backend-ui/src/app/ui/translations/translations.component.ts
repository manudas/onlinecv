import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { TranslationInterface, TranslationEnum, EditTranslationStructure } from '@app/types/Translations'
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
import * as TRANSLATION_ACTIONS from '@store_actions/Translation'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { TranslationsDialogComponent } from './translations-dialog.component'

type StoreType = { locale: LocaleStore } & {translation: { translationManager: { missing: TranslationInterface[] } & { translated: TranslationInterface[] }}}
@Component({
  selector: 'app-training',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationComponent implements OnInit {

  faArrowsAlt: IconDefinition = faArrowsAlt
  faEdit: IconDefinition = faEdit
  faTable: IconDefinition = faTable
  faTrash: IconDefinition = faTrash

  type: TranslationEnum = null;

  missingCols = [
    'id',
    'module',
    'domain',
    'tag',
    'lastTimeFetched',
    'accessCounter',
    'edit',
    'delete',
  ]

  missingData: TranslationInterface[] = []
  missingData$: Observable<TranslationInterface[]>
  translatedData: TranslationInterface[] = []
  translatedData$: Observable<TranslationInterface[]>

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor(private activatedRoute: ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in TranslationEnum)) {
        this.type = TranslationEnum.all
      } else {
        this.type = TranslationEnum[passedType]
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))

    this.missingData$ = this.store.pipe(select(state => state?.translation?.translationManager?.missing))
    this.translatedData$ = this.store.pipe(select(state => state?.translation?.translationManager?.translated))
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data)

    this.missingData$.subscribe((data: TranslationInterface[]) => data ? this.missingData = data : null)
    this.translatedData$.subscribe((data: TranslationInterface[]) => data ? this.translatedData = data : null)

    this.activatedRoute.paramMap.subscribe(() => this.fetchData())
  }

  fetchData() {
    let actions = []
    switch (this.type) {
      case TranslationEnum.all:
        actions.push(TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS( { iso: this.selectedLocale } ))
        // no break
      case TranslationEnum.missing:
        actions.push(TRANSLATION_ACTIONS.FETCH_MISSING_TRANSLATIONS( { iso: this.selectedLocale } ))
        break
      case TranslationEnum.translated:
        actions.push(TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS( { iso: this.selectedLocale } ))
        break
    }
    actions.forEach(single_action => this.store.dispatch(single_action))
  }

  isType(typeString: string) {
    return this.type === TranslationEnum.all || this.type === TranslationEnum[typeString]
  }

  TranslationTypes: Number[] = Object.keys(TranslationEnum).filter((e: any) => !isNaN(e)).map(Number)
  TranslationTypeStrings = Object.keys(TranslationEnum).filter((e: any) => isNaN(e))

  getSource(type: number) {
    return this[`${this.TranslationTypeStrings[type]}Data`]
  }

  getColumns(type: number) {
    return this[`${this.TranslationTypeStrings[type]}Cols`]
  }

  openEditDialog(data: EditTranslationStructure | string): void {
    /*
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
    */
  }

  edit(index: number, type: string) {
    const translation = this[`${type}Data`][index]
    this.openEditDialog({
      translation,
      index
    })
  }

  openRemovalDialog(index: number, type: Number): void {
    /*
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
    */
  }

  hasActions(type) {
    return TranslationEnum[type] === TranslationEnum[TranslationEnum.translated] // only translated has actions
  }
}
