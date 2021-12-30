import {
    Component,
    OnInit,
} from '@angular/core'
import {
    MatDialog
} from '@angular/material/dialog'
import {
    ActivatedRoute
} from '@angular/router'
import {
    logEasy
} from '@app/services/logging'
import {
    TranslationInterface,
    TranslationEnum,
    EditTranslationStructure
} from '@app/types/Translations'
import {
    LocaleStore
} from '@app/types/Locale'

import {
    faArrowsAlt,
    faEdit,
    faTable,
    faTrash,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import {
    select,
    Store
} from '@ngrx/store'
import {
    Observable
} from 'rxjs'
import * as TRANSLATION_ACTIONS from '@store_actions/Translation'
import {
    ConfirmComponent
} from '@app/ui/confirm/confirm.component'
import {
    TranslationsDialogComponent
} from './translations-dialog.component'

type StoreType = {
    locale: LocaleStore
} & {
    translation: {
        translationManager: {
            missing: TranslationInterface[]
        } & {
            translated: TranslationInterface[]
        }
    }
}
@Component({
    selector: 'app-translations',
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
        'module',
        'domain',
        'tag',
        'lastTimeFetched',
        'accessCounter',
        'edit',
        'delete',
    ]
    translatedCols = [
        'module',
        'domain',
        'tag',
        'text',
        'lastTimeFetched',
        'accessCounter',
        'edit',
        'delete',
    ]


    missingData: TranslationInterface[] = []
    missingData$: Observable < TranslationInterface[] >
        translatedData: TranslationInterface[] = []
    translatedData$: Observable < TranslationInterface[] >

        selectedLocale: string // iso code
    selectedLocale$: Observable < string >

        constructor(private activatedRoute: ActivatedRoute, private store: Store < StoreType > , private matDialog: MatDialog) {
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
                actions.push(TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS({
                    iso: this.selectedLocale
                }))
                // no break
            case TranslationEnum.missing:
                actions.push(TRANSLATION_ACTIONS.FETCH_MISSING_TRANSLATIONS({
                    iso: this.selectedLocale
                }))
                break
            case TranslationEnum.translated:
                actions.push(TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS({
                    iso: this.selectedLocale
                }))
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

    dispatchSave(data: EditTranslationStructure) {
        this.store.dispatch(TRANSLATION_ACTIONS.SAVE_TRANSLATION({
            translation: data
        }))
    }

    deleteTranslation(id: string) {
        this.store.dispatch(TRANSLATION_ACTIONS.DELETE_TRANSLATION({
            translation: id
        }))
    }

    openEditDialog(data ? : EditTranslationStructure): void {
        const dialogRef = this.matDialog.open(TranslationsDialogComponent, {
            width: '80%',
            data
        })

        dialogRef.afterClosed().subscribe(result => {
            logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
            if (result) {
                const {
                    translation
                } = result;
                this.dispatchSave({
                    ...translation,
                    language: this.selectedLocale,
                });
            }
        })
    }

    edit(index: number, type: string) {
        const translation = this[`${type}Data`][index]
        this.openEditDialog({
            translation,
            index,
            isMissing: type === 'missing'
        })
    }

    openRemovalDialog(index: number, type: string): void {
        const translation = this[`${type}Data`][index]
        const dialogRef = this.matDialog.open(ConfirmComponent, {
            width: '80%',
            data: {
                index,
                element: translation,
                nameKey: 'tag',
                superType: 'translation',
                action: 'delete'
            }
        })

        dialogRef.afterClosed().subscribe(({
            element: {
                id = null
            } = {},
        } = {}) => {
            logEasy(`The dialog was closed.`, id !== null ? `The following message was received: ${JSON.stringify(id)}` : '');

            if (id !== null) {
                this.deleteTranslation(id)
            }
        })
    }

    hasActions(type) {
        return TranslationEnum[type] === TranslationEnum[TranslationEnum.translated] // only translated has actions
    }

    getLocaleDateFromTimestamp(timestamp: string) {
        return (new Date(Number(timestamp))).toLocaleDateString()
    }
}