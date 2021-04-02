import { Component, OnInit } from '@angular/core';
import { TranslationService } from './services/translation/translation.service';

import debounce from 'lodash/debounce';

import { useMemo } from '@utils/index'
import { LocaleStore, ModuleTagPairType, TranslationStore } from './types';
import { select, Store } from '@ngrx/store';
import { FETCH_TRANSLATIONS } from '@store_actions/Translation';
import { Observable } from 'rxjs';

type StoreType = { locale: LocaleStore } & { translation: TranslationStore}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  { // added OnInit to make a regular Angular component with usual life cycle
  title = 'backend-ui';

  debounceTimeout = 200; // ms between different request of translations to be taken into consideration

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor(private store: Store<StoreType>, private translationService: TranslationService) {
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
  }

  /*
    * We are going to use useMemo
    * here in order to not refetch
    * the data from the backend if
    * the input (requested translations
    * array), hasn't changed
    */
  debouncedHandler = useMemo<ModuleTagPairType>( debounce(
    ([params, iso]) => {

      const {module_arr, tag_arr } = params;

      return this.store.dispatch(FETCH_TRANSLATIONS({
        iso,
        modules: module_arr,
        tags: tag_arr
      }))

    },
    this.debounceTimeout,
    {
        'leading': false,
        'trailing': true,
    }),{ // Memo options
      ignoreMemorisedValue: true
    });

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => {
      this.selectedLocale = data
      this.requestTranslations()
    })
  }

  ngAfterViewChecked(): void {
    this.requestTranslations()
  }

  requestTranslations() {
    const translations = this.translationService.getDuplicatesFilteredTranslationsRequest()
    if (Object.keys(translations).length > 0 && this.selectedLocale) {
      this.debouncedHandler(this.translationService.getModuleTagPairs(translations), this.selectedLocale)
    }
  }
}
