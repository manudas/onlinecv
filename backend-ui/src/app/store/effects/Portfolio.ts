import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'

import {
    switchMap,
    mergeMap,
    map,
    tap,
    catchError
} from 'rxjs/operators'

import * as PORTFOLIO_ACTIONS from '@store_actions/Portfolio'
import * as COMMON_ACTIONS from '@store_actions/Common'
import { DataService } from '@services/data/data.service'
import { QueryPortfolio, MutatePortfolio, RemovePortfolio } from '@services/data/queries'
import { LoginService } from '@app/ui/login/login-service/login.service';

import {
    PortfolioRequest,
} from '@app/types/Portfolio'

import { TranslationService } from '@app/services/translation/translation.service'
import { logEasy } from '@app/services/logging/logging.service'
import { select, Store } from '@ngrx/store'
import { LocaleStore } from '@app/types'

type StoreType = { locale: LocaleStore }

@Injectable()
export class PortfolioEffects {
    translationsToRequest = ['Error']
    selectedLocale: string // iso code
    selectedLocale$: Observable<string>

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private loginService: LoginService,
        private translate: TranslationService,
        private store: Store<StoreType>
    ) {
        this.translate.prefetch(
            this.translationsToRequest,
            this
        )
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.selectedLocale$.subscribe((data: string) => {
            this.selectedLocale = data
        })
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public fetchPortfolioEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(PORTFOLIO_ACTIONS.FETCH_PORTFOLIO),
        tap((action) =>
            logEasy(
                    `Action caught in ${this.constructor.name}:`,
                    action
            )
        ),
        switchMap((action) => {
            const {
                language,
            } = action

            const {
                query,
                variables
            } = QueryPortfolio(language)
            // if a new Actions arrives, the old Observable will be canceled
            return this.dataService.readData(query, variables).pipe(
                map(({ portfolio }: PortfolioRequest) => {
                    return PORTFOLIO_ACTIONS.PORTFOLIO_FETCHED({ payload: [...portfolio] })
                }),
                catchError((response) => {
                    const { errors = [] } = response || {}
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: errors.map(error => error.message),
                    })
                })
            )
        })
    ))

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public setPortfolioEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(PORTFOLIO_ACTIONS.SAVE_PORTFOLIO),
        tap((action) =>
            logEasy(
                `Action caught in ${this.constructor.name}:`,
                action
            )
        ),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                portfolio,
            } = action

            const {
                query,
                variables
            } = MutatePortfolio(portfolio)

            return this.dataService.setData(query, variables, headers).pipe(
                mergeMap(({ portfolio }: PortfolioRequest) => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Skill removed successfully', this)}`
                    }),
                    PORTFOLIO_ACTIONS.PORTFOLIO_FETCHED({ payload: [...portfolio] })
                ]),
                catchError((response) => {
                    const { errors = [] } = response || {}
                    return of(COMMON_ACTIONS.FAIL({
                        message: errors.map(error => error.message),
                        timeout: 2000
                    }))
                })
            )
        })
    ))

    public removePortfolioEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof PORTFOLIO_ACTIONS.REMOVE_PORTFOLIO>>(PORTFOLIO_ACTIONS.REMOVE_PORTFOLIO),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                id,
            } = action

            const { query, variables } = RemovePortfolio(id)

            return this.dataService.setData(query, variables, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Skill removed successfully', this)}`
                    }),
                    PORTFOLIO_ACTIONS.FETCH_PORTFOLIO({ language: this.selectedLocale })
                ]),
                catchError((response) => {
                    const { errors = [] } = response || {}
                    return of(COMMON_ACTIONS.FAIL({
                        message: errors.map(error => error.message),
                        timeout: 2000
                    }))
                })
            )
        })
    ))
}
