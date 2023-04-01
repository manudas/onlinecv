import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router'
import { logEasy } from '@app/services/logging'
import { TranslationInterface, TranslationEnum, EditTranslationStructure } from '@app/types/Translations'
import { LocaleStore } from '@app/types/Locale'
import { faLanguage, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Action, ActionCreator, select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as TRANSLATION_ACTIONS from '@store_actions/Translation'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import * as INPUT_HELPERS from './inputHelpers'
import { buildDataMap } from '@app/ui/dialog/helpers'

type StoreType = { locale: LocaleStore } & { translation: { translationManager: { missing: TranslationInterface[] } & { translated: TranslationInterface[] } } }
const translationTypeActionMap = new Map<TranslationEnum, ActionCreator>([
    [TranslationEnum.missing, TRANSLATION_ACTIONS.FETCH_MISSING_TRANSLATIONS],
    [TranslationEnum.translated, TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS]
])

@Component({
    selector: 'app-translations',
    templateUrl: './translations.component.html',
    styleUrls: ['./translations.component.scss']
})
export class TranslationComponent implements OnInit {
    TranslationEnum                                                             = TranslationEnum
    cardIcon: IconDefinition                                                    = faLanguage
    type: TranslationEnum                                                       = null
    inputData                                                                   = INPUT_HELPERS
    title: string                                                               = 'Translations'
    data$: Partial<Record<TranslationEnum, Observable<TranslationInterface[]>>> = {}
    data: Partial<Record<TranslationEnum, TranslationInterface[]>>              = {}

    selectedLocale: string // iso code
    selectedLocale$: Observable<string>

    constructor( private activatedRoute: ActivatedRoute, private store: Store<StoreType>, private matDialog: MatDialog ) {
        this.activatedRoute.paramMap.subscribe((params) => {
            const passedType: string = params.get('type')
            if (!(passedType in TranslationEnum)) this.type = TranslationEnum.all
            else this.type = TranslationEnum[passedType]
        })
        this.selectedLocale$ = this.store.pipe( select((state) => state?.locale?.selectedLocale) )
        this.prepareDataSubscriptions('translation', 'translationManager')
    }

    private prepareDataSubscriptions(...storeKey: string[]) {
        for (let type of Object.values(TranslationEnum)) { // type here is string, TranslationEnum[type] will be a number in common enums
            if (typeof type === 'string' || type === TranslationEnum.all) continue
            this.data$[type] = this.store.pipe(select(state => storeKey.reduce((prev, curr) => prev?.[curr], state)?.[TranslationEnum[type]]))
            this.data$[type].subscribe((data: TranslationInterface[]) => data ? this.data[type] = data : null)
        }
    }

    ngOnInit(): void {
        this.selectedLocale$.subscribe((data: string) => { this.selectedLocale = data; this.fetchData() })
        this.activatedRoute.paramMap.subscribe(() => this.fetchData())
    }

    fetchData() {
        if (this.type !== TranslationEnum.all) this.store.dispatch(translationTypeActionMap.get(this.type)({ iso: this.selectedLocale }) as Action)
        else {
            Object.values(TranslationEnum).filter((type) => typeof type !== 'string' ).forEach((type: TranslationEnum) => {
                type !== TranslationEnum.all && this.store.dispatch(translationTypeActionMap.get(type)({ iso: this.selectedLocale }) as Action)
            })
        }
    }
    edit = ( type: string ) => (index: number) => this.openDialog(type, index)
    hasActions = ( type ) => ( type === TranslationEnum[TranslationEnum.translated] ) // only translated has actions
    isActive = (type: string) => this.type === TranslationEnum.all || this.type === TranslationEnum[type]
    dispatchSave = (data: EditTranslationStructure) => this.store.dispatch( TRANSLATION_ACTIONS.SAVE_TRANSLATION({ translation: data }) )
    delete = (id: string) => this.store.dispatch( TRANSLATION_ACTIONS.DELETE_TRANSLATION({ translation: id }) )

    openDialog( type: string, index: number = null ): void {
        const types = TranslationEnum[type] === TranslationEnum.translated
            ? INPUT_HELPERS.dataDefaultInputTypesByTranslationType.get(TranslationEnum.translated)
            : INPUT_HELPERS.dataDefaultInputTypesByTranslationType.get(TranslationEnum.missing)
        const COMPOSED_INPUT_HELPERS = { ...INPUT_HELPERS, dataDefaultInputTypes: types }
        const data = buildDataMap(this.data[TranslationEnum[type]], index, COMPOSED_INPUT_HELPERS, this.title, type)
        const dialogRef = this.matDialog.open( DialogComponent, { width: '80%', data } )

        dialogRef.afterClosed().subscribe((result) => {
            logEasy( `The dialog was closed.`, result ? `The following message was received: ${JSON.stringify( result )}` : '' )
            if (result) {
                /*
                 * Option 1: is an edit. The structure is {index, translation}
                 * Option 2: is a new translation. It'll be just a translation object
                 */
                let {
                    translation = result // if empty, result is the translation object itself
                } = result
                this.dispatchSave({ ...translation, language: this.selectedLocale })
            }
        })
    }

    openRemovalDialog = ( type: string ) => (index: number): void => {
        const translation = this.data[TranslationEnum[type]][index]
        const dialogRef = this.matDialog.open(ConfirmComponent, { width: '80%', data: { index, element: translation, nameKey: 'tag', superType: 'translation', action: 'delete' } })

        dialogRef.afterClosed().subscribe(
            ({ element: { id = null } = {} } = {}) => {
                logEasy(`The dialog was closed.`, id !== null? `The following message was received: ${JSON.stringify( id )}` : '' )
                if (id !== null) this.delete(id)
            }
        )
    }
}
