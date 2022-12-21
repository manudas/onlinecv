import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'

import {
    switchMap,
    map,
    tap,
    catchError
} from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service'

import * as LOCALE_ACTIONS from '@store_actions/Locale'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'
import { Locale as LocaleQuery } from '@services/data/queries'
import {
    getLocaleTypeRequest,
    SET_LOCALE_ACTION_TYPE
} from '@app/types/Locale'
import { TranslationService } from '@app/services/translation/translation.service'
import { logEasy } from '@app/services/logging/logging.service'
import { LANG_COOKIE } from '@app/utils/constants'

@Injectable()
export class LocaleEffects {
    translationsToRequest = ['Error']

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private cookieService: CookieService,
        private translate: TranslationService
    ) {
        this.translate.prefetch(
            this.translationsToRequest,
            this
        )
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    
    public fetchLocaleEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(LOCALE_ACTIONS.FETCH_AVAILABLE_LOCALES),
        tap((action) =>
            logEasy({
                messages: [
                    `Action caught in ${this.constructor.name}:`,
                    action
                ]
            })
        ),
        switchMap(() =>
            // if a new Actions arrives, the old Observable will be canceled
            this.dataService.readData(LocaleQuery).pipe(
                map(({ locales }: getLocaleTypeRequest) => {
                    return LOCALE_ACTIONS.AVAILABLE_LOCALES_FETCHED(
                        { payload: [...locales] }
                    )
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: errors.map(error => error.message),
                    })
                })
            )
        )
    ))

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    
    public setLocaleEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(LOCALE_ACTIONS.SET_LOCALE),
        tap((action) =>
            logEasy(
                `Action caught in ${this.constructor.name}:`,
                action
            )
        ),
        tap((action) => {
            const { iso } = action as SET_LOCALE_ACTION_TYPE
            // set Cookie if there is a value to set
            iso && this.cookieService.set(LANG_COOKIE, iso)
        })
    ), { dispatch: false })
}
