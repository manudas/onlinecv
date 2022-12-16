import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, map, tap, catchError } from 'rxjs/operators';

import * as DETAILS from '@store_actions/Details'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QueryDetails,
    MutateDetails
} from '@services/data/queries'
import { DetailsFetched, DetailsType } from '@app/types/Details'
import { TranslationService } from '@app/services/translation/translation.service'
import { logEasy } from '@app/services/logging/logging.service';

@Injectable()
export class DetailsEffects {

    translationsToRequest = ['Details saved successfully', 'Error']

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
    
    public fetchDetailsEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof DETAILS.FETCH_DETAILS>>(DETAILS.FETCH_DETAILS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
            } = action

            const vars = {
                language,
            }

            return this.dataService.readData(QueryDetails, vars).pipe(
                map((details: DetailsFetched) => {
                    return {
                        type: DETAILS.DETAILS_FETCHED.type,
                        ...details
                    };
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: errors.map(error => error.message)
                    });
                })
            )
        })
    ));

        /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    
    public mutateDetailsEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof DETAILS.SAVE_DETAILS>>(DETAILS.SAVE_DETAILS),
        tap((action) => logEasy({messages: [`Action caught in ${this.constructor.name}:`, action]})),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                details,
            } = action

            const vars = {
                details,
            }

            return this.dataService.setData(MutateDetails, vars).pipe(
                map((details: DetailsType) => {
                    return {
                        type: COMMON_ACTIONS.SUCCESS.type,
                        message: `${this.translate.getResolvedTranslation('Details saved successfully', this)}`
                    };
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((error) => {
                    const { error: {errors = []} = {} } = error || {}
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: errors.map(error => error.message)
                    });
                })
            )
        })
    ));
}