import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';

import * as SKILLS_ACTIONS from '@store_actions/Skills'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QuerySkills,
    MutateSkills,
    RemoveSkill
} from '@services/data/queries'
import { TranslationService } from '@app/services/translation/translation.service'
import { select, Store } from '@ngrx/store';
import { LocaleStore } from '@app/types/Locale';
import { SkillsFetched } from '@app/types/Skills';
import { logEasy } from '@app/services/logging/logging.service';
import { LoginService } from '@app/ui/login/login-service/login.service';

type StoreType = { locale: LocaleStore }

@Injectable()
export class SkillEffects {

    translationsToRequest = ['Skills saved successfully', 'Skill removed successfully', 'Error']

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
    public fetchSkills$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SKILLS_ACTIONS.FETCH_SKILLS>>(SKILLS_ACTIONS.FETCH_SKILLS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        mergeMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
                skillType,
            } = action

            const vars = {
                language,
                type: skillType,
            }

            return this.dataService.readData(QuerySkills, vars).pipe(
                map((skillsData: SkillsFetched) => {
                    return SKILLS_ACTIONS.SKILLS_FETCHED(
                        {
                            skillType,
                            ...skillsData
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
    public mutateSkillsEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SKILLS_ACTIONS.SAVE_SKILLS>>(SKILLS_ACTIONS.SAVE_SKILLS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                skills,
                skillType
            } = action

            const vars = {
                skills,
            }

            return this.dataService.setData(MutateSkills, vars, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Skills saved successfully', this)}`
                    }),
                    SKILLS_ACTIONS.FETCH_SKILLS({
                        language: this.selectedLocale,
                        skillType
                    })
                ]),
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
    public removeSkillEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SKILLS_ACTIONS.REMOVE_SKILL>>(SKILLS_ACTIONS.REMOVE_SKILL),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                id,
                skillType
            } = action

            const vars = {
                id,
            }

            return this.dataService.setData(RemoveSkill, vars, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Skill removed successfully', this)}`
                    }),
                    SKILLS_ACTIONS.FETCH_SKILLS({
                        language: this.selectedLocale,
                        skillType
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