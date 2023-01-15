import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'

import { switchMap, map, tap, catchError, mergeMap } from 'rxjs/operators'

import * as OTHERS_ACTIONS from '@store_actions/Others'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import { TranslationService } from '@app/services/translation/translation.service'
import { logEasy } from '@app/services/logging/logging.service'
import { MutateReferences, MutateResume, QueryReferences, QueryResume, RemoveReference, RemoveResume } from '@app/services/data/queries'
import { LocaleStore, OthersType, ReferencesFetched, ResumeFetched } from '@app/types'
import { select, Store } from '@ngrx/store'

type StoreType = { locale: LocaleStore }

@Injectable()
export class OthersEffects {

    translationsToRequest = ['References saved successfully', 'Reference removed successfully', 'Error', 'Resume updated successfully']

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
    public fetchReferencesEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(OTHERS_ACTIONS.FETCH(OthersType['professional-references'])),
        // ofType<ReturnType<typeof OTHERS_ACTIONS.FETCH(OthersType['professional-references'])>>(OTHERS_ACTIONS.FETCH(OthersType['professional-references'])),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
            } = action

            const {
                query,
                variables
            } = QueryReferences(language)

            return this.dataService.readData(query, variables).pipe(
                map((references: ReferencesFetched) => {
                    return OTHERS_ACTIONS.REFERENCES_FETCHED({
                        ...references
                    })
                }),
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
    public mutateReferencesEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof OTHERS_ACTIONS.SAVE_REFERENCES>>(OTHERS_ACTIONS.SAVE_REFERENCES),
        tap((action) => logEasy({messages: [`Action caught in ${this.constructor.name}:`, action]})),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                references,
            } = action

            const {
                query,
                variables
            } = MutateReferences(references)

            return this.dataService.setData(query, variables).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('References saved successfully', this)}`
                    }),
                    OTHERS_ACTIONS.FETCH(OthersType['professional-references'])({
                        language: this.selectedLocale,
                    })
                ]),
                catchError((error) => {
                    const { error: {errors = []} = {} } = error || {}
                    return of(COMMON_ACTIONS.FAIL({
                        message: errors.map(error => error.message)
                    }))
                })
            )
        })
    ))

     /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public removeReferenceEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof OTHERS_ACTIONS.REMOVE_REFERENCE>>(OTHERS_ACTIONS.REMOVE_REFERENCE),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                id,
            } = action

            const {
                query,
                variables,
            } = RemoveReference(id)

            return this.dataService.setData(query, variables).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Reference removed successfully', this)}`
                    }),
                    OTHERS_ACTIONS.FETCH(OthersType['professional-references'])({
                        language: this.selectedLocale,
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
    ))

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public fetchResumeEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(OTHERS_ACTIONS.FETCH(OthersType['upload-resume'])),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
            } = action

            const {
                query,
                variables
            } = QueryResume(language)

            return this.dataService.readData(query, variables).pipe(

                map((resume: ResumeFetched) => {
                    return OTHERS_ACTIONS.RESUME_FETCHED({
                        ...resume
                    })
                }),
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
    public mutateResumeEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(OTHERS_ACTIONS.SAVE_RESUME),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                resume,
            } = action

            const {
                query,
                variables
            } = MutateResume(resume)

            return this.dataService.setData(query, variables).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Resume updated successfully', this)}`
                    }),
                    OTHERS_ACTIONS.FETCH(OthersType['upload-resume'])({
                        language: this.selectedLocale,
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
    ))


    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public removeResumeEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof OTHERS_ACTIONS.REMOVE_RESUME>>(OTHERS_ACTIONS.REMOVE_RESUME),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
            } = action

            const {
                query,
                variables,
            } = RemoveResume(language)

            return this.dataService.setData(query, variables).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Resume removed successfully', this)}`
                    }),
                    OTHERS_ACTIONS.FETCH(OthersType['upload-resume'])({
                        language: this.selectedLocale,
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
    ))
}