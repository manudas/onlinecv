import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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

type StoreType = { locale: LocaleStore }

@Injectable()
export class LanguageEffects {

    translationsToRequest = ['Languages saved successfully', 'Language removed successfully', 'Error']

    selectedLocale: string // iso code
    selectedLocale$: Observable<string>

    constructor(
        private actions$: Actions,
        private dataService: DataService,
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
    @Effect()
    public fetchLanguages$: Observable<any> = this.actions$.pipe(
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
                catchError((error) => {
                    return of(COMMON_ACTIONS.FAIL(
                        {
                            message: `${this.translate.getResolvedTranslation('Error', this)}: ${JSON.stringify(error)}`
                        }
                    ))
                })
            )
        })
    )

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public mutateLanguagesEffect$: Observable<any> = this.actions$.pipe(
        ofType<ReturnType<typeof LANGUAGE_ACTIONS.SAVE_LANGUAGES>>(LANGUAGE_ACTIONS.SAVE_LANGUAGES),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                languages
            } = action

            const vars = {
                languages,
            }

            return this.dataService.setData(MutateLanguages, vars).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Languages saved successfully', this)}`
                    }),
                    LANGUAGE_ACTIONS.FETCH_LANGUAGES({
                        language: this.selectedLocale,
                    })
                ]),
                // handle failure in todoListService.fetchTodoList()
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    const messages = errors.map(({message = ''} = {}) => message)
                    return of(COMMON_ACTIONS.FAIL({
                        message: `${this.translate.getResolvedTranslation('Error', this)}: ${messages.length ? messages.join('\n') : JSON.stringify(response)}`,
                        timeout: 2000
                    }))
                })
            )
        })
    )

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public removeLanguageEffect$: Observable<any> = this.actions$.pipe(
        ofType<ReturnType<typeof LANGUAGE_ACTIONS.REMOVE_LANGUAGE>>(LANGUAGE_ACTIONS.REMOVE_LANGUAGE),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                id,
            } = action

            const vars = {
                id,
            }

            return this.dataService.setData(RemoveLanguage, vars).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Language removed successfully', this)}`
                    }),
                    LANGUAGE_ACTIONS.FETCH_LANGUAGES({
                        language: this.selectedLocale,
                    })
                ]),
                // handle failure in todoListService.fetchTodoList()
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    const messages = errors.map(({message = ''} = {}) => message)
                    return of(COMMON_ACTIONS.FAIL({
                        message: `${this.translate.getResolvedTranslation('Error', this)}: ${messages.length ? messages.join('\n') : JSON.stringify(response)}`,
                        timeout: 2000
                    }))
                })
            )
        })
    );
}