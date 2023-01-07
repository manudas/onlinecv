import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';

import * as EXPERIENCE_ACTIONS from '@store_actions/Experience'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QueryExperiences,
    MutateExperiences,
    RemoveExperience
} from '@services/data/queries'
import { TranslationService } from '@app/services/translation/translation.service'
import { select, Store } from '@ngrx/store';
import { LocaleStore } from '@app/types/Locale';
import { ExperienceFetched } from '@app/types/Experience';
import { logEasy } from '@app/services/logging/logging.service';

type StoreType = { locale: LocaleStore }

@Injectable()
export class ExperienceEffects {

    translationsToRequest = ['Experience saved successfully', 'Experience removed successfully', 'Error']

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
    public fetchExperience$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof EXPERIENCE_ACTIONS.FETCH_EXPERIENCE>>(EXPERIENCE_ACTIONS.FETCH_EXPERIENCE),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        mergeMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
                experienceType,
            } = action

            const {
                query,
                variables,
            } = QueryExperiences(language, experienceType)

            return this.dataService.readData(query, variables).pipe(
                map((experienceData: ExperienceFetched) => {
                    return EXPERIENCE_ACTIONS.EXPERIENCE_FETCHED(
                        {
                            experienceType,
                            ...experienceData
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
    public mutateExperiencesEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof EXPERIENCE_ACTIONS.SAVE_EXPERIENCES>>(EXPERIENCE_ACTIONS.SAVE_EXPERIENCES),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                experiences,
                experienceType
            } = action

            const {
                query,
                variables,
            } = MutateExperiences(experiences)

            return this.dataService.setData(query, variables).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Experience saved successfully', this)}`
                    }),
                    EXPERIENCE_ACTIONS.FETCH_EXPERIENCE({
                        language: this.selectedLocale,
                        experienceType
                    })
                ]),
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
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
    public removeExperienceEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof EXPERIENCE_ACTIONS.REMOVE_EXPERIENCE>>(EXPERIENCE_ACTIONS.REMOVE_EXPERIENCE),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                id,
                experienceType
            } = action

            const {
                query,
                variables,
            } = RemoveExperience(id)

            return this.dataService.setData(query, variables).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Experience removed successfully', this)}`
                    }),
                    EXPERIENCE_ACTIONS.FETCH_EXPERIENCE({
                        language: this.selectedLocale,
                        experienceType
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
    ));
}