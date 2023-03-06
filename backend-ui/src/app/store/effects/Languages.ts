import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';

import * as LANGUAGE_ACTIONS from '@store_actions/Languages'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QueryLanguages,
    MutateLanguages,
    RemoveLanguage
} from '@services/data/queries'
import { TranslationService } from '@app/services/translation/translation.service'
import { select, Store } from '@ngrx/store';
import { LocaleStore } from '@app/types/Locale';
import { LanguagesFetched } from '@app/types/Languages';
import { logEasy } from '@app/services/logging/logging.service';
import { LoginService } from '@app/ui/login/login-service/login.service';

type StoreType = { locale: LocaleStore }

@Injectable()
export class LanguageEffects {

    translationsToRequest = ['Languages saved successfully', 'Language removed successfully', 'Error']

    selectedLocale: string // iso code
    selectedLocale$: Observable<string>

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private loginService: LoginService,
        private translate: TranslationService,
        private store: Store<StoreType>
    ) {
        this.translate.prefetch(this.translationsToRequest, this)
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.selectedLocale$.subscribe((data: string) => {
            this.selectedLocale = data
        })
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public fetchLanguages$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof LANGUAGE_ACTIONS.FETCH_LANGUAGES>>(LANGUAGE_ACTIONS.FETCH_LANGUAGES),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        mergeMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
            } = action

            const vars = {
                language,
            }

            return this.dataService.readData(QueryLanguages, vars).pipe(
                map((languagesData: LanguagesFetched) => {
                    return LANGUAGE_ACTIONS.LANGUAGES_FETCHED(
                        {
                            ...languagesData
                        }
                    )
                }),
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    return of(COMMON_ACTIONS.FAIL(
                        {
                            message: errors.map(error => error.message)
                        }
                    ))
                })
            )
        })
    ))

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public mutateLanguagesEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof LANGUAGE_ACTIONS.SAVE_LANGUAGES>>(LANGUAGE_ACTIONS.SAVE_LANGUAGES),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                languages
            } = action

            const vars = {
                languages,
            }

            return this.dataService.setData(MutateLanguages, vars, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Languages saved successfully', this)}`
                    }),
                    LANGUAGE_ACTIONS.FETCH_LANGUAGES({
                        language: this.selectedLocale,
                    })
                ]),
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    return of(COMMON_ACTIONS.FAIL({
                        message: errors.map(error => error.message),
                        timeout: 2000
                    }))
                })
            )
        })
    ))

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public removeLanguageEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof LANGUAGE_ACTIONS.REMOVE_LANGUAGE>>(LANGUAGE_ACTIONS.REMOVE_LANGUAGE),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                id,
            } = action

            const vars = {
                id,
            }

            return this.dataService.setData(RemoveLanguage, vars, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Language removed successfully', this)}`
                    }),
                    LANGUAGE_ACTIONS.FETCH_LANGUAGES({
                        language: this.selectedLocale,
                    })
                ]),
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    return of(COMMON_ACTIONS.FAIL({
                        message: errors.map(error => error.message),
                        timeout: 2000
                    }))
                })
            )
        })
    ))
}