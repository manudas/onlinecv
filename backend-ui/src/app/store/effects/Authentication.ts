import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'

import { switchMap, map, tap, catchError } from 'rxjs/operators'

import * as AUTH_ACTIONS from '@store_actions/Authentication'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import { TranslationService } from '@app/services/translation/translation.service'
import { logEasy } from '@app/services/logging/logging.service'
import { MutateAuthentication, MutateSignUp, QueryAdminUserExists, QueryCheckToken } from '@app/services/data/queries'
import { LocaleStore } from '@app/types'
import { select, Store } from '@ngrx/store'

import { AdminUserExistResponse, Authentication, AuthenticationInput, AuthenticationResponse } from '@app/types/Authentication';
import { LoginService } from '@app/ui/login/login-service/login.service'

type StoreType = { locale: LocaleStore }

@Injectable()
export class AuthenticationEffects {

    translationsToRequest = []

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
    public checkTokenEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.checkToken),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((_action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                query,
            } = QueryCheckToken()

            return this.dataService.readData(query, null, headers).pipe(
                map(({
                    checkToken
                } : {
                    checkToken: Authentication
                }) => {
                    const { authenticated } = checkToken

                    if (authenticated) {
                        return AUTH_ACTIONS.checkTokenSuccess({ Authentication: checkToken})
                    }
                    return AUTH_ACTIONS.checkTokenFailure({ Authentication: checkToken})
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
    public checkTokenSuccessEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.checkTokenSuccess),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        tap(({
            Authentication:
            {
                token
            }
        }) => { // if a new Actions arrives, the old Observable will be canceled
            this.loginService.setToken(token)
        })
    ), { dispatch: false })

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public checkTokenFailureEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.checkTokenFailure),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        tap(() =>{
            this.loginService.removeToken()
        }),
        switchMap((_action) => { // if a new Actions arrives, the old Observable will be canceled
            return of(AUTH_ACTIONS.checkAdminUserExists())
        })
    ))

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public loginSuccessEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.loginSuccess),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        tap(({ Authentication: { token } }) => {
            this.loginService.setToken(token)
        }),
    ), { dispatch: false })

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public loginFailureEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.loginFailure),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        tap(() => {
            this.loginService.removeToken()
        }),
    ), { dispatch: false })

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public checkAdminUserExistsEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.checkAdminUserExists),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((_action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                query,
            } = QueryAdminUserExists()

            return this.dataService.readData(query).pipe(
                map((data: AdminUserExistResponse) => {
                    return AUTH_ACTIONS.checkAdminUserExistsFetched(data)
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
    public singUpEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.singUp),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap(({username, password, rememberMe}) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                query,
                variables
            } = MutateSignUp({username, password, rememberMe} as AuthenticationInput)

            return this.dataService.setData(query, variables).pipe(
                map((data: AuthenticationResponse) => {
                    const {
                        signup
                    } = data
                    const { authenticated } = signup
                    if (authenticated) {
                        return AUTH_ACTIONS.loginSuccess({ Authentication: signup })
                    } else {
                        return AUTH_ACTIONS.loginFailure({ Authentication: signup })
                    }
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
    public loginEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AUTH_ACTIONS.login),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap(({username, password, rememberMe}) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                query,
                variables
            } = MutateAuthentication({username, password, rememberMe} as AuthenticationInput)

            return this.dataService.setData(query, variables).pipe(
                map(({ authentication }: AuthenticationResponse) => {
                    const {
                        authenticated
                    } = authentication
                    if (authenticated) {
                        return AUTH_ACTIONS.loginSuccess({ Authentication: authentication })
                    } else {
                        return AUTH_ACTIONS.loginFailure({ Authentication: authentication })
                    }
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
}