import {
    Injectable
} from '@angular/core';
import {
    Actions,
    Effect,
    ofType
} from '@ngrx/effects';
import {
    Observable,
    of
} from 'rxjs';

import {
    switchMap,
    map,
    tap,
    catchError
} from 'rxjs/operators';

import * as TRANSLATION_ACTIONS from '@store_actions/Translation'
import * as COMMON_ACTIONS from '@store_actions/Common'

import {
    DataService
} from '@services/data/data.service'
import {
    DeleteTranslation,
    MissingTranslations,
    SaveTranslation,
    TranslatedStrings,
    Translations as TranslationsQuery,
} from '@services/data/queries'

import {
    ActionRequestTranslation,
    PutTranslation,
    ReceivedTranslationsType,
    RemovedTranslation,
    TranslatedTranslations,
} from '@app/types/Translations';
import {
    TranslationService
} from '@app/services/translation/translation.service';
import {
    logEasy
} from '@app/services/logging/logging.service';

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
    public fetchTranslationsEffect$: Observable < any > = this.actions$.pipe(
        ofType(TRANSLATION_ACTIONS.FETCH_TRANSLATIONS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action) => { // if a new Actions arrives, the old Observable will be canceled

            const {
                iso,
                modules,
                tags,
                domain,
            } = action as ActionRequestTranslation

            const {
                query,
                variables,
            } = TranslationsQuery(iso, tags, modules, domain)

            return this.dataService.readData(query, variables).pipe(
                map((translations: ReceivedTranslationsType) => {
                    return {
                        type: TRANSLATION_ACTIONS.FETCH_TRANSLATIONS_OK.type,
                        payload: {
                            ...translations
                        }
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

    /**
     * Effect to request missing translations
     */
    @Effect()
    public fetchMissingTranslationsEffect$: Observable < any > = this.actions$.pipe(
        ofType(TRANSLATION_ACTIONS.FETCH_MISSING_TRANSLATIONS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action: ReturnType < typeof TRANSLATION_ACTIONS.FETCH_MISSING_TRANSLATIONS > ) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                iso,
            } = action

            const {
                query,
                variables,
            } = MissingTranslations(iso)

            return this.dataService.readData(query, variables).pipe(
                map((translations: ReceivedTranslationsType) => {
                    return {
                        type: TRANSLATION_ACTIONS.FETCH_MISSING_TRANSLATIONS_OK.type,
                        payload: {
                            ...translations
                        }
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

    /**
     * Effect to request translated translations
     */
    @Effect()
    public fetchTranslatedTranslationsEffect$: Observable < any > = this.actions$.pipe(
        ofType(TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),
        switchMap((action: ReturnType < typeof TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS > ) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                iso,
            } = action

            const {
                query,
                variables,
            } = TranslatedStrings(iso)

            return this.dataService.readData(query, variables).pipe(
                map((translations: TranslatedTranslations) => {
                    return TRANSLATION_ACTIONS.FETCH_TRANSLATED_TRANSLATIONS_OK({
                        payload: {
                            ...translations
                        }
                    })
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


    /**
     * Effect to request the upsert of a given translation
     */
    @Effect()
    public saveTranslationEffect$: Observable < any > = this.actions$.pipe(
        ofType(TRANSLATION_ACTIONS.SAVE_TRANSLATION),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),

        switchMap((action: ReturnType < typeof TRANSLATION_ACTIONS.SAVE_TRANSLATION > ) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                translation,
            } = action

            const {
                query,
                variables,
            } = SaveTranslation(translation)

            return this.dataService.readData(query, variables).pipe(
                map((translation: PutTranslation) => {
                    return TRANSLATION_ACTIONS.TRANSLATION_SAVED({
                        payload: {
                            ...translation
                        }
                    });
                }),
                // handle failure
                catchError((error) => {
                    return of({
                        type: COMMON_ACTIONS.FAIL.type,
                        message: `${this.translate.getResolvedTranslation('Error', this)}: ${error}`
                    })
                })
            )
        })
    );

    /**
     * Effect to request the deletion of a given translation
     */
    @Effect()
    public deleteTranslationEffect$: Observable < any > = this.actions$.pipe(
        ofType(TRANSLATION_ACTIONS.DELETE_TRANSLATION),
        tap((action) => logEasy(`Action caught in ${this.constructor.name}:`, action)),

        switchMap((action: ReturnType < typeof TRANSLATION_ACTIONS.DELETE_TRANSLATION > ) => { // if a new Actions arrives, the old Observable will be canceled
            const {
                translation,
            } = action

            const {
                query,
                variables,
            } = DeleteTranslation(translation)

            return this.dataService.readData(query, variables).pipe(
                map((translation: RemovedTranslation) => {
                    return TRANSLATION_ACTIONS.TRANSLATION_DELETED({
                        payload: {
                            ...translation
                        }
                    });
                }),
                // handle failure
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