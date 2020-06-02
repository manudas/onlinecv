import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, map, tap, catchError } from 'rxjs/operators';

import * as DETAILS from '@store_actions/Details'

import { DataService } from '@services/data/data.service'
import { Details as DetailsQuery } from '@services/data/queries'
import { DetailsType } from '@app/types/Details'

@Injectable()
export class DetailsEffects {

    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) {}

    /** 
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public fetchDetailsEffect$: Observable<any> = this.actions$.pipe(
        ofType(DETAILS.FETCH_DETAILS),
        tap((action) => console.log('Action caught in DetailsEffects:', action)),
        switchMap(() => // if a new Actions arrives, the old Observable will be canceled
            this.dataService.readData(DetailsQuery).pipe(
                map((details: DetailsType) => {
                    return {
                        type: DETAILS.DETAILS_FETCHED.type,
                        payload: { details }
                    };
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((error) => {
                    return of({
                        type: DETAILS.DETAILS_FETCH_FAILED.type,
                        payload: { error }
                    });
                })
            )
        )
    );
}