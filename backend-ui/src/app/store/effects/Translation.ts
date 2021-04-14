import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { switchMap, map, tap, catchError } from 'rxjs/operators';

import * as TRANSLATION_ACTIONS from '@store_actions/Translation'
import * as COMMON_ACTIONS from '@store_actions/Common'

import { DataService } from '@services/data/data.service'
import { Translations as TranslationsQuery } from '@services/data/queries'

import { ActionRequestTranslation, ReceivedTranslationsType } from '@app/types/Translations';
import { TranslationService } from '@app/services/translation/translation.service';
import { logEasy } from '@app/services/logging/logging.service';

@Injectable()
export class TranslationEffects {

    translationsToRequest = ['Error']

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private translate: TranslationService
    ) {
        this.translate.prefetch(this.translationsToRequest, this)
    }

    /**
     * Effect provides new actions as
     * a result of the operation performed
     */
    @Effect()
    public fetchTranslationsEffect$: Observable<any> = this.actions$.pipe(
        ofType(TRANSLATION_ACTIONS.FETCH_TRANSLATIONS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled

            const {
                iso,
                modules,
                tags,
            } = action as ActionRequestTranslation

            const vars = {
                language: iso,
                modules,
                tags,
            }

            return this.dataService.readData(TranslationsQuery, vars).pipe(
                map((translations: ReceivedTranslationsType) => {
                    return {
                        type: TRANSLATION_ACTIONS.FETCH_TRANSLATIONS_OK.type,
                        payload: { ...translations }
                    };
                }),
                // handle failure in todoListService.fetchTodoList()
                catchError((error) => {
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: `${this.translate.getResolvedTranslation('Error', this)}: ${error}`
                    })
                })
            )
        })
    );
}