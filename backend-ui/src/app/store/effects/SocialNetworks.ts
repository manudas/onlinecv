import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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

type StoreType = { locale: LocaleStore }

@Injectable()
export class SocialNetworksEffects {

    translationsToRequest = ['Social Networks saved successfully', 'Social Networks removed successfully', 'Error']
    translationsObservables: {
        [translationKey: string]: Observable<string>
    } = {}
    translatedStrings: {
        [translationKey: string]: string
    } = {}

    selectedLocale: string // iso code
    selectedLocale$: Observable<string>

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private translate: TranslationService,
        private store: Store<StoreType>
    ) {
        this.translationsToRequest.forEach(translationKey => {
            this.translationsObservables[translationKey] = this.translate.transform(translationKey, this)
            this.translationsObservables[translationKey].subscribe((data: string) => {
                this.translatedStrings[translationKey] = data
            })
        })
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.selectedLocale$.subscribe((data: string) => {
            this.selectedLocale = data
        })
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public fetchSocialNetworks$: Observable<any> = this.actions$.pipe(
        ofType<ReturnType<typeof SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS>>(SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS),
        tap((action) => console.log('Action caught in DetailsEffects:', action)),
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
                catchError((error) => {
                    return of(COMMON_ACTIONS.FAIL(
                        {
                            message: `${this.translatedStrings['Error']}: ${JSON.stringify(error)}`
                        }
                    ))
                })
            )
        })
    );

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public mutateNetworksEffect$: Observable<any> = this.actions$.pipe(
        ofType<ReturnType<typeof SOCIAL_NETWORK_ACTIONS.SAVE_NETWORKS>>(SOCIAL_NETWORK_ACTIONS.SAVE_NETWORKS),
        tap((action) => console.log('Action caught in DetailsEffects:', action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                socialNetworks,
            } = action

            const vars = {
                socialNetworks,
            }

            return this.dataService.setData(MutateSocialNetworks, vars).pipe(
                mergeMap(() => [
                    COMMON_ACTIONS.SUCCESS({
                        message: `${this.translatedStrings['Social Networks saved successfully']}`
                    }),
                    SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS({
                        language: this.selectedLocale
                    })
                ]),
                // handle failure in todoListService.fetchTodoList()
                catchError((response) => {
                    const { error: {errors = []} = {} } = response || {}
                    const messages = errors.map(({message = ''} = {}) => message)
                    return of(COMMON_ACTIONS.FAIL({
                        message: `${this.translatedStrings['Error']}: ${messages.length ? messages.join('\n') : JSON.stringify(response)}`,
                        timeout: 2000
                    }))
                })
            )
        })
    )

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
             @Effect()
             public removeNetworkEffect$: Observable<any> = this.actions$.pipe(
                 ofType<ReturnType<typeof SOCIAL_NETWORK_ACTIONS.REMOVE_NETWORK>>(SOCIAL_NETWORK_ACTIONS.REMOVE_NETWORK),
                 tap((action) => console.log('Action caught in DetailsEffects:', action)),
                 switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
                     const {
                         id,
                     } = action

                     const vars = {
                         id,
                     }

                     return this.dataService.setData(RemoveNetwork, vars).pipe(
                         mergeMap(() => [
                             COMMON_ACTIONS.SUCCESS({
                                 message: `${this.translatedStrings['Social Networks removed successfully']}`
                             }),
                             SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS({
                                 language: this.selectedLocale
                             })
                         ]),
                         // handle failure in todoListService.fetchTodoList()
                         catchError((response) => {
                             const { error: {errors = []} = {} } = response || {}
                             const messages = errors.map(({message = ''} = {}) => message)
                             return of(COMMON_ACTIONS.FAIL({
                                 message: `${this.translatedStrings['Error']}: ${messages.length ? messages.join('\n') : JSON.stringify(response)}`,
                                 timeout: 2000
                             }))
                         })
                     )
                 })
             );
}