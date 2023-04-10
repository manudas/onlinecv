import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'

import { switchMap, map, tap, catchError } from 'rxjs/operators'

import * as MESSAGING from '@store_actions/Messaging'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'

import {
    QueryMessageTypes,
    QueryMessagesByTypes,
} from '@services/data/queries'
import { MessageDef } from '@app/types/MessagingSystem'
import { TranslationService } from '@app/services/translation/translation.service'
import { logEasy } from '@app/services/logging/logging.service'

import { LoginService } from '@app/ui/login/login-service/login.service'

@Injectable()
export class MessagingSystemEffects {

    translationsToRequest = ['Settings saved successfully']

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private loginService: LoginService,
        private translate: TranslationService,
    ) {
        this.translate.prefetch(this.translationsToRequest, this)
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    public fetchMessagingTypesEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof MESSAGING.GET_MESSAGING_TYPES>>(MESSAGING.GET_MESSAGING_TYPES),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()

            const {
                query,
            } = QueryMessageTypes()

            return this.dataService.readData(query, null, headers).pipe(
                map(({ getMessageTypes }) => {
                    return MESSAGING.MESSAGING_TYPES_FETCHED({ messageTypes: [...getMessageTypes] })
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
    public fetchMessagesEffect$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType<ReturnType<typeof MESSAGING.GET_MESSAGES>>(MESSAGING.GET_MESSAGES),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled
            const headers = this.loginService.processHeader()
            const { messageType } = action
            const {
                query,
                variables
            } = QueryMessagesByTypes(messageType)

            return this.dataService.readData(query, variables, headers).pipe(
                map(({ messages}) => {
                    return MESSAGING.GET_MESSAGES_FETCHED({ messages })
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