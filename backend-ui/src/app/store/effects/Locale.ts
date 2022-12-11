import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import {
    switchMap,
    map,
    tap,
    catchError
} from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import * as LOCALE_ACTIONS from '@store_actions/Locale';
import * as COMMON_ACTIONS from '@store_actions/Common';

import { DataService } from '@services/data/data.service';
import { Locale as LocaleQuery } from '@services/data/queries';
import {
    getLocaleTypeRequest,
    SET_LOCALE_ACTION_TYPE
} from '@app/types/Locale';
import { TranslationService } from '@app/services/translation/translation.service';
import { logEasy } from '@app/services/logging/logging.service';

@Injectable()
export class LocaleEffects {
    translationsToRequest = ['Error'];

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private cookieService: CookieService,
        private translate: TranslationService
    ) {
        this.translate.prefetch(
            this.translationsToRequest,
            this
        );
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public fetchLocaleEffect$: Observable<any> = this.actions$.pipe(
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
                    );
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((error) => {
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: `${this.translate.getResolvedTranslation(
                            'Error',
                            this
                        )}: ${error}`
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
        tap((action) =>
            logEasy(
                `Action caught in ${this.constructor.name}:`,
                action
            )
        ),
        tap((action) => {
            // if a new Actions arrives, the old Observable will be canceled
            const { iso } =
                action as SET_LOCALE_ACTION_TYPE;
            this.cookieService.set('selectedLocale', iso);
        })
    );
}
