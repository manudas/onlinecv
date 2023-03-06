import { Component, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { select, Store } from '@ngrx/store'

import {
  LocaleType,
  LocaleStore,
} from '@app/types'

import * as ACTION_LOCALE from '@store_actions/Locale'
import { Observable } from 'rxjs'
import { LANG_COOKIE } from '@app/utils/constants'

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  locales: LocaleType[]
  locales$: Observable<LocaleType[]>

  // iso code
  selectedLocale: string
  selectedLocale$: Observable<string>

  // iso code
  cookieLocale: string = ''

  constructor(private store: Store<{ locale: LocaleStore }>, private cookieService: CookieService) {
    this.cookieLocale = this.cookieService.get(LANG_COOKIE)
  }

  ngOnInit(): void {
    this.store.dispatch(ACTION_LOCALE.FETCH_AVAILABLE_LOCALES())
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.locales$ = this.store.pipe(select(state => state?.locale?.locales))

    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data)
    this.locales$.subscribe((data: LocaleType[]) => this.locales = data)

    if (this.cookieLocale) {
      this.store.dispatch(ACTION_LOCALE.SET_LOCALE({ iso: this.cookieLocale }))
    }
  }

  handleChangeLanguage(newLanguage: string) {
    this.store.dispatch(ACTION_LOCALE.SET_LOCALE({ iso: newLanguage }))
  }

  getClassName() {
    return this.locales?.[this.selectedLocale]?.flag
  }

  getLocaleOptions() {
    return this.locales ? Object.values(this.locales).sort((a, b) => a.iso > b.iso ? 1 : -1) : []
  }
}
