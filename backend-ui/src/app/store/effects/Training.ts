import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';

import * as TRAINING_ACTIONS from '@store_actions/Training'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QueryTrainings,
    MutateTrainings,
    RemoveTraining
} from '@services/data/queries'
import { TranslationService } from '@app/services/translation/translation.service'
import { select, Store } from '@ngrx/store';
import { LocaleStore } from '@app/types/Locale';
import { TrainingFetched } from '@app/types/Training';
import { logEasy } from '@app/services/logging/logging.service';
import { LoginService } from '@app/ui/login/login-service/login.service';

type StoreType = { locale: LocaleStore }

@Injectable()
export class TrainingEffects {

    translationsToRequest = ['Training saved successfully', 'Training removed successfully', 'Error']

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
    public fetchTraining$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof TRAINING_ACTIONS.FETCH_TRAINING>>(TRAINING_ACTIONS.FETCH_TRAINING),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        mergeMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
                trainingType,
            } = action

            const {
                query,
                variables,
            } = QueryTrainings(language, trainingType)

            return this.dataService.readData(query, variables).pipe(
                map((trainingData: TrainingFetched) => {
                    return TRAINING_ACTIONS.TRAINING_FETCHED(
                        {
                            trainingType,
                            ...trainingData
                        }
                    )
                }),
                catchError((response) => {
                    const { errors = [] } = response || {}
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
    public mutateTrainingsEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof TRAINING_ACTIONS.SAVE_TRAININGS>>(TRAINING_ACTIONS.SAVE_TRAININGS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                trainings,
                trainingType
            } = action

            const {
                query,
                variables,
            } = MutateTrainings(trainings)

            return this.dataService.setData(query, variables, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Training saved successfully', this)}`
                    }),
                    TRAINING_ACTIONS.FETCH_TRAINING({
                        language: this.selectedLocale,
                        trainingType
                    })
                ]),
                catchError((response) => {
                    const { errors = [] } = response || {}
                    const messages = errors.map(({message = ''} = {}) => message)
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
    public removeTrainingEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof TRAINING_ACTIONS.REMOVE_TRAINING>>(TRAINING_ACTIONS.REMOVE_TRAINING),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                id,
                trainingType
            } = action

            const {
                query,
                variables,
            } = RemoveTraining(id)

            return this.dataService.setData(query, variables, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Training removed successfully', this)}`
                    }),
                    TRAINING_ACTIONS.FETCH_TRAINING({
                        language: this.selectedLocale,
                        trainingType
                    })
                ]),
                catchError((response) => {
                    const { errors = [] } = response || {}
                    const messages = errors.map(({message = ''} = {}) => message)
                    return of(COMMON_ACTIONS.FAIL({
                        message: errors.map(error => error.message),
                        timeout: 2000
                    }))
                })
            )
        })
    ))
}