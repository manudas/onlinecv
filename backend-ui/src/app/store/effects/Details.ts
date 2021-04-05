import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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

@Injectable()
export class DetailsEffects {

    translationsToRequest = ['Saved successfully', 'Error']
    translationsObservables: {
        [translationKey: string]: Observable<string>
    } = {}
    translatedStrings: {
        [translationKey: string]: string
    } = {}

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private translate: TranslationService,
    ) {
        this.translationsToRequest.forEach(translationKey => {
            this.translationsObservables[translationKey] = this.translate.transform(translationKey, this)
            this.translationsObservables[translationKey].subscribe((data: string) => {
                this.translatedStrings[translationKey] = data
            })
        })
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public fetchDetailsEffect$: Observable<any> = this.actions$.pipe(
        ofType<ReturnType<typeof DETAILS.FETCH_DETAILS>>(DETAILS.FETCH_DETAILS),
        tap((action) => console.log('Action caught in DetailsEffects:', action)),
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
                catchError((error) => {
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: `${this.translatedStrings['Error']}: ${error}`
                    });
                })
            )
        })
    );

        /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public mutateDetailsEffect$: Observable<any> = this.actions$.pipe(
        ofType<ReturnType<typeof DETAILS.SAVE_DETAILS>>(DETAILS.SAVE_DETAILS),
        tap((action) => console.log('Action caught in DetailsEffects:', action)),
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
                        message: `${this.translatedStrings['Saved successfully']}`
                    };
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((error) => {
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: `${this.translatedStrings['Error']}: ${error}`
                    });
                })
            )
        })
    );
}