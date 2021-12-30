import {
    Component,
    OnInit
} from '@angular/core';
import {
    Observable
} from 'rxjs';

import {
    TranslationService
} from './services/translation/translation.service';

import debounce from 'lodash/debounce';

import {
    useMemo
} from '@utils/index'
import {
    LocaleStore,
    ModuleTagPairType,
    TranslationStore,
    MessageType
} from './types';
import {
    select,
    Store
} from '@ngrx/store';
import {
    FETCH_TRANSLATIONS
} from '@store_actions/Translation';
import {
    MatSnackBar
} from '@angular/material/snack-bar';

import {
    TRANSLATION_DOMAIN,
} from './utils/constants'

type StoreType = {
    locale: LocaleStore
} & {
    translations: TranslationStore
} & {
    message: MessageType
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

    constructor(private store: Store < StoreType > , private translationService: TranslationService, private snackBar: MatSnackBar) {
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.appMessage$ = this.store.pipe(select(state => state?.message))
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
                this.openSnackBar(data.message, data.timeout || 1000)
            }
        })
    }

    openSnackBar(message: string, duration: number) {
        this.snackBar.open(message, null, {
            duration,
        });
    }

    ngAfterViewChecked(): void {
        this.requestTranslations()
    }

    requestTranslations() {
        const translations = this.translationService.getDuplicatesFilteredTranslationsRequest()
        if (Object.keys(translations).length > 0 && this.selectedLocale) {
            this.debouncedHandler(this.translationService.getModuleTagPairs(translations), this.selectedLocale)
        }
    }
}