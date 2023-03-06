import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, mergeMap, map, tap, catchError } from 'rxjs/operators';

import * as SOCIAL_NETWORK_ACTIONS from '@store_actions/SocialNetworks'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QuerySocialNetworks,
    MutateSocialNetworks,
    RemoveNetwork
} from '@services/data/queries'
import { TranslationService } from '@app/services/translation/translation.service'
import { select, Store } from '@ngrx/store';
import { LocaleStore } from '@app/types/Locale';
import { SocialNetworkFetched } from '@app/types/SocialNetworks';
import { logEasy } from '@app/services/logging/logging.service';
import { LoginService } from '@app/ui/login/login-service/login.service';

type StoreType = { locale: LocaleStore }

@Injectable()
export class SocialNetworksEffects {

    translationsToRequest = ['Social Networks saved successfully', 'Social Network removed successfully', 'Error']

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
    public fetchSocialNetworks$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS>>(SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                language,
            } = action

            const vars = {
                language,
            }

            return this.dataService.readData(QuerySocialNetworks, vars).pipe(
                map((socialNetworksData: SocialNetworkFetched) => {
                    return SOCIAL_NETWORK_ACTIONS.NETWORKS_FETCHED(
                        {...socialNetworksData}
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
    public mutateNetworksEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SOCIAL_NETWORK_ACTIONS.SAVE_NETWORKS>>(SOCIAL_NETWORK_ACTIONS.SAVE_NETWORKS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                socialNetworks,
            } = action

            const vars = {
                socialNetworks,
            }

            return this.dataService.setData(MutateSocialNetworks, vars, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Social Networks saved successfully', this)}`
                    }),
                    SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS({
                        language: this.selectedLocale
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
    public removeNetworkEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof SOCIAL_NETWORK_ACTIONS.REMOVE_NETWORK>>(SOCIAL_NETWORK_ACTIONS.REMOVE_NETWORK),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                id,
            } = action

            const vars = {
                id,
            }

            return this.dataService.setData(RemoveNetwork, vars, headers).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translate.getResolvedTranslation('Social Network removed successfully', this)}`
                    }),
                    SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS({
                        language: this.selectedLocale
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