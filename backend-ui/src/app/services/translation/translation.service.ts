import { Injectable } from "@angular/core";
import { LocaleStore } from "@app/types";
import {
    DBTranslation,
    InternalStoredTranslationInterface,
    ModuleTagPairType,
    RequestedTranslations,
    StoredTranslationsObservable,
    TranslationStore,
    TranslationsType
} from "@app/types/Translations";
import {
    Store,
    select
} from "@ngrx/store";
import {
    Observable,
    ReplaySubject
} from "rxjs";

type StoreType = { locale: LocaleStore } & { translation: TranslationStore}

@Injectable()
export class TranslationService {
    requestedTranslations: RequestedTranslations  = { } // the translations that are to be requested to the API
    storedTranslationsObservable: StoredTranslationsObservable = {} // observes each translation individually

    selectedLocale // iso code
    selectedLocale$: Observable<string>;

    translations: TranslationsType = {} // real translations from the API
    translations$: Observable<DBTranslation[]> // observes the whole translation object

    constructor(private store: Store<StoreType>) {
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
      this.selectedLocale$.subscribe((data: string) => {
        this.selectedLocale = data
      })

      this.translations$ = this.store.pipe(select(state =>
        state?.translation?.translations
      ))
      this.translations$.subscribe((data: DBTranslation[]) => {
        const receivedData = data || []

        receivedData.forEach(currentTranslation => {
          const {
            language,
            module,
            tag
          } = currentTranslation

          const internalTranslation: InternalStoredTranslationInterface = this.getTranslation(tag, module, language)
          internalTranslation.translation = currentTranslation
          this.emitTranslation(tag, module, language)
        });
      })
    }

    getTranslationSubject(key:string, componentName: string, locale?: string) {
        if (!locale) {
          locale = this.selectedLocale
        }
        if (this.storedTranslationsObservable[locale] === undefined) {
          this.storedTranslationsObservable[locale] = {}
        }
        const languageGroup = this.storedTranslationsObservable[locale]
        if (languageGroup[componentName] === undefined) {
          languageGroup[componentName] = {}
        }
        const componentGroup = languageGroup[componentName]
        if (componentGroup[key] === undefined) {
          componentGroup[key] = new ReplaySubject(1);

          this.emitTranslation(key, componentName, locale) // emit the initial translation
        }

        return componentGroup[key]
    }

    emitTranslation(tag: string, module: string, locale: string) {
        const {
          translation, // real translation
          initialTranslation // initial value before the translation takes place
        } = this.getTranslation(tag, module, locale)

        const translationSubject = this.getTranslationSubject(tag, module, locale)

        const translationText = translation ? translation.text : initialTranslation
        translationSubject.next(translationText)
    }

    getTranslation(key: string, componentName: string, locale?: string): InternalStoredTranslationInterface {
        if (!locale) {
          locale = this.selectedLocale
        }
        if (this.translations[locale] === undefined) {
          this.translations[locale] = {}
        }
        const languageGroup = this.translations[locale]
        if (languageGroup[componentName] === undefined) {
          languageGroup[componentName] = {}
        }
        const componentGroup = languageGroup[componentName]
        if (componentGroup[key] === undefined) {
          componentGroup[key] = {
            initialTranslation: key
          }
        }
        return componentGroup[key]
    }

    getTranslationsRequest() {
        return this.requestedTranslations
    }

    /**
     * Filters out all the translations that
     * we already have in our local translation
     * storage
     */
    getDuplicatesFilteredTranslationsRequest() {
        const translations = this.getTranslationsRequest()
        const filteredTranslations = {}
        Object.entries(translations).forEach(([module, tags]) => {
          const filteredTags = tags.filter((individualTag) => {
            const existingTranslation = this.getTranslation(individualTag, module, this.selectedLocale)
            if (existingTranslation.translation) {
              return false
            }
            return true
          })
          if (filteredTags.length) {
            filteredTranslations[module] = filteredTags
          }
        })

        return filteredTranslations
    }

    requestTranslation(tag: string, module: string) {
        if (tag) { // let's avoid empty or undefined tags
            this.requestedTranslations[module] = this.requestedTranslations[module] || [];
            if (!this.requestedTranslations[module].includes(tag)) {
                this.requestedTranslations[module].push(tag);
            }
        }
    }

    getModuleTagPairs = (translations: RequestedTranslations): ModuleTagPairType => {
        const result = {
          module_arr: [],
          tag_arr: []
        }
        // Object.entries(payload).forEach(([key, value])
        const indexValueList = Object.entries(translations);
        indexValueList.forEach(([key, value]) => {
          const keyArr = Array(value.length).fill(key) // fills the array with the key values.length times
          result.module_arr.push(...keyArr) // key is the name of the module for which we are looking the translation for
          result.tag_arr.push(...value) // value represents the tag we are looking the translation for inside its module
        })

        return result
    }
}
