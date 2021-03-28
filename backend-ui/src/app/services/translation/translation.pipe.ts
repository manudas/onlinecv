import { Pipe, PipeTransform } from '@angular/core';
import {
  LocaleStore,
  StoredTranslationsObservable,
  TranslationStore,
  TranslationsType,
} from '@app/types';
import { select, Store } from '@ngrx/store';
import {
  Observable,
  of,
} from 'rxjs';

type StoreType = { locale: LocaleStore } & { translation: TranslationStore}

/*
 * Translate a string to the localised version
 * depending on language id passed as a parameter
*/
@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {

  selectedLocale // iso code
  selectedLocale$: Observable<string>;

  translations: TranslationsType
  translations$: Observable<TranslationsType>

  constructor(private store: Store<StoreType>) {
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.selectedLocale$.subscribe((data: string) => {
      this.selectedLocale = data





      this.selectedLocale = 'es'
    })

    this.translations$ = this.store.pipe(select(state => state?.translation?.translations))
    this.translations$.subscribe((data: TranslationsType) => {
      this.translations = data




      this.translations = {}
    })
  }

  storedTranslationsObservable: StoredTranslationsObservable = {}

  getAndInitTranslation(key: string, componentName: string) {
    if (this.translations[this.selectedLocale] === undefined) {
      this.translations[this.selectedLocale] = {}
    }
    const languageGroup = this.translations[this.selectedLocale]
    if (languageGroup[componentName] === undefined) {
      languageGroup[componentName] = {}
    }
    const componentGroup = languageGroup[componentName]
    if (componentGroup[key] === undefined) {
      componentGroup[key] = key
    }
    return componentGroup[key]
  }

  getAndInitTranslationObservable(key:string, componentName: string) {
    if (this.storedTranslationsObservable[this.selectedLocale] === undefined) {
      this.storedTranslationsObservable[this.selectedLocale] = {}
    }
    const languageGroup = this.storedTranslationsObservable[this.selectedLocale]
    if (languageGroup[componentName] === undefined) {
      languageGroup[componentName] = {}
    }
    const componentGroup = languageGroup[componentName]
    if (componentGroup[key] === undefined) {
      componentGroup[key] = of(this.getAndInitTranslation(key, componentName))
    }
    return componentGroup[key]
  }

  transform(key: string, component: any = null): Observable<string> {
    const caller: string = component?.constructor?.name // otherwise, undefined
    const observable = this.getAndInitTranslationObservable(key, caller)
    return observable
  }
}