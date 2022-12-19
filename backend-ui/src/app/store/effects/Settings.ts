import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'

import { switchMap, map, tap, catchError } from 'rxjs/operators'

import * as SETTINGS from '@store_actions/Settings'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QuerySettings,
    MutateSettings
} from '@services/data/queries'
import { SettingsFetched, SettingsType } from '@app/types/Settings'
import { TranslationService } from '@app/services/translation/translation.service'
import { logEasy } from '@app/services/logging/logging.service'

@Injectable()
export class SettingsEffects {

    translationsToRequest = ['Settings saved successfully']

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private translate: TranslationService,
    ) {
        this.translate.prefetch(this.translationsToRequest, this)
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    
    public fetchSettingsEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SETTINGS.FETCH_SETTINGS>>(SETTINGS.FETCH_SETTINGS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
            } = action

            const {
                query,
                variables,
            } = QuerySettings(language)

            return this.dataService.readData(query, variables).pipe(
                map((settings: SettingsFetched) => {
                    return SETTINGS.SETTINGS_FETCHED({...settings})
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: errors.map(error => error.message)
                    })
                })
            )
        })
    ))

        /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    
    public mutateSettingsEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SETTINGS.SAVE_SETTINGS>>(SETTINGS.SAVE_SETTINGS),
        tap((action) => logEasy({messages: [`Action caught in ${this.constructor.name}:`, action]})),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                settings,
            } = action

            const {
                query,
                variables,
            } = MutateSettings(settings)

            return this.dataService.setData(query, variables).pipe(
                map((settings: SettingsType) => {
                    return {
                        type: COMMON_ACTIONS.SUCCESS.type,
                        message: `${this.translate.getResolvedTranslation('Settings saved successfully', this)}`
                    }
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError(({
                    error: {
                        errors = []
                    } = {}
                }) => {
                    return of(COMMON_ACTIONS.FAIL({message: errors.map(error => error.message), timeout: 2000}))
                })
            )
        })
    ))
}