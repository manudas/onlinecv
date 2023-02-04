import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from './services/translation/translation.service';
import debounce from 'lodash-es/debounce';
import { useMemo } from '@utils/index'
import { LocaleStore, ModuleTagPairType, TranslationStore, MessageType } from './types';
import { select, Store } from '@ngrx/store';
import { FETCH_TRANSLATIONS } from '@store_actions/Translation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TRANSLATION_DOMAIN } from './utils/constants'

import * as COMMON_ACTIONS from '@store_actions/Common'
import { Authentication } from './types/Authentication';
import { checkToken } from './store/actions/Authentication';

type StoreType = {
    locale: LocaleStore
} & {
    translations: TranslationStore
} & {
    message: MessageType
} & {
    authentication: Authentication & { adminUserExist: boolean }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { // added OnInit to make a regular Angular component with usual life cycle
    title = 'backend-ui';

    debounceTimeout = 200; // ms between different request of translations to be taken into consideration

    selectedLocale: string // iso code
    selectedLocale$: Observable < string >

    appMessage$: Observable < MessageType >







































    // USAR INTERCEPTORS. SI ALGUNA QUERY DE BACKEND RESPONDE NO AUTORIZADO, BORRAR TOKEN Y REDIRIGIR A PANTALLA DE LOGIN, PONIENDO userLoggedIn variable a false.
    userLoggedIn$: Observable<boolean>
    userLoggedIn: boolean = false

    adminUserExists$: Observable<boolean>
    adminUserExists: boolean = false



























    constructor(private store: Store < StoreType > , private translationService: TranslationService, private snackBar: MatSnackBar) {
        this.adminUserExists$ = this.store.pipe(select(state => state?.authentication?.adminUserExist))
        this.appMessage$ = this.store.pipe(select(state => state?.message))
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.userLoggedIn$ = this.store.pipe(select(state => state?.authentication?.authenticated))
    }

    /*
     * We are going to use useMemo
     * here in order to not refetch
     * the data from the backend if
     * the input (requested translations
     * array), hasn't changed
     */
    debouncedHandler = useMemo < ModuleTagPairType > (debounce(
        ([params, iso]) => {

            const {
                module_arr,
                tag_arr
            } = params;

            return this.store.dispatch(FETCH_TRANSLATIONS({
                iso,
                modules: module_arr,
                tags: tag_arr,
                domain: TRANSLATION_DOMAIN
            }))

        },
        this.debounceTimeout, {
            'leading': false,
            'trailing': true,
        }), { // Memo options
        ignoreMemorisedValue: true
    });

    ngOnInit(): void {
        this.selectedLocale$.subscribe((data: string) => {
            this.selectedLocale = data
            this.requestTranslations()
        })
        this.appMessage$.subscribe((data: MessageType) => {
            if (Object.keys(data).length > 0) {
                this.openSnackBar(data.message, data.timeout || 1000, data.type)
            }
        })
        this.userLoggedIn$.subscribe(data => this.userLoggedIn = data)
        this.adminUserExists$.subscribe(data => this.adminUserExists = data)

        this.store.dispatch(checkToken())
    }

    openSnackBar(message: string | string[], duration: number, type: string = null) {
        const msg_arr = Array.isArray(message) ? message: [message]
        const className = type === COMMON_ACTIONS.FAIL.type ? 'SnackFailed' : 'SnackSuccess'
        msg_arr.forEach( (message, index) => {
            setTimeout(() => {
                this.snackBar.open( message, null, { duration, panelClass: className} )
            }, index * (duration + 500)) // 500 => timeout between two messages
        })
    }

    ngAfterViewChecked(): void {
        this.requestTranslations()
    }

    requestTranslations() {
        const translations = this.translationService.getNotTranslatedTranslationsRequest()
        if (Object.keys(translations).length > 0 && this.selectedLocale) {
            this.debouncedHandler(this.translationService.getModuleTagPairs(translations), this.selectedLocale)
        }
    }
}