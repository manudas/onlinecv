import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { TranslationInterface, TranslationEnum } from '@app/types/Translations'
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

type StoreType = { locale: LocaleStore } & {translations: { missing: TranslationInterface[] } & { translated: TranslationInterface[] }}
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

  colsToRenderMissing = [
    'id',
    'module',
    'domain',
    'tag',
    'lastTimeFetched',
    'accessCounter',
  ]

  missingTranslationData: TranslationInterface[] = []
  missingTranslationData$: Observable<TranslationInterface[]>
  translatedData: TranslationInterface[] = []
  translatedData$: Observable<TranslationInterface[]>

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor(private activatedRoute: ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog) {
    debugger
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      if (!(passedType in TranslationEnum)) {
        this.type = TranslationEnum.all
      } else {
        this.type = TranslationEnum[passedType]
      }
    })

    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))

    this.missingTranslationData$ = this.store.pipe(select(state => state?.translations?.missing))
    this.translatedData$ = this.store.pipe(select(state => state?.translations?.translated))
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data)

    this.missingTranslationData$.subscribe((data: TranslationInterface[]) => data ? this.missingTranslationData = data : null)
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
}
