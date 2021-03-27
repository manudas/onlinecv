import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'

import { switchMap, map, tap, catchError } from 'rxjs/operators'

import { CookieService } from 'ngx-cookie-service'

import * as LOCALE_ACTIONS from '@store_actions/Locale'

import { DataService } from '@services/data/data.service'
import { Locale as LocaleQuery } from '@services/data/queries'
import {
    getLocaleTypeRequest,
    SET_LOCALE_ACTION_TYPE,
} from '@app/types/Locale'

@Injectable()
export class LocaleEffects {

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private cookieService: CookieService
    ) {}

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public fetchLocaleEffect$: Observable<any> = this.actions$.pipe(
        ofType(LOCALE_ACTIONS.FETCH_AVAILABLE_LOCALES),
        tap((action) => console.log('Action caught in LocaleEffects:', action)),
        switchMap(() => // if a new Actions arrives, the old Observable will be canceled
            this.dataService.readData(LocaleQuery).pipe(
                map((data: getLocaleTypeRequest) => {
                    return {
                        type: LOCALE_ACTIONS.AVAILABLE_LOCALES_FETCHED.type,
                        payload: [ ...data.getLocales ]
                    };
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((error) => {
                    return of({
                        type: LOCALE_ACTIONS.AVAILABLE_LOCALES_FETCH_FAILED.type,
                        payload: { error }
                    });
                })
            )
        )
    );

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect({ dispatch: false })
    public setLocaleEffect$: Observable<any> = this.actions$.pipe(
        ofType(LOCALE_ACTIONS.SET_LOCALE),
        tap((action) => console.log('Action caught in LocaleEffects:', action)),
        tap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                iso
            } = action as SET_LOCALE_ACTION_TYPE
            this.cookieService.set('selectedLocale', iso)
        })
    );
}