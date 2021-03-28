import { Component, OnInit } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { select, Store } from '@ngrx/store'

import {
  LocaleType,
  LocaleStore,
} from '@app/types'

import * as ACTION_LOCALE from '@store_actions/Locale'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  locales: LocaleType[]
  locales$: Observable<LocaleType[]>

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>
  cookieLocale: string = '' // iso code -> !'' -> true -> negación de cadena vacía -> true

  filterInput: string

  constructor(private store: Store<{ locale: LocaleStore }>, private cookieService: CookieService) {
    this.cookieLocale = this.cookieService.get('selectedLocale')
  }

  ngOnInit(): void {
    this.store.dispatch(ACTION_LOCALE.FETCH_AVAILABLE_LOCALES())
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.locales$ = this.store.pipe(
      select(
        state => state?.locale?.locales
      )
    )

    this.selectedLocale$.subscribe((data: string) =>
      this.selectedLocale = data
    )
    this.locales$.subscribe((data: LocaleType[]) =>
      this.locales = data
    )

    if (this.cookieLocale) {
      this.store.dispatch(ACTION_LOCALE.SET_LOCALE({
        iso: this.cookieLocale
      }))
    }

    // IDIOMA ELEGIDO EN SELECTOR:
    // 1 - ¿tenemos idioma en cookie? RESTAURAR A NGRX STORE
    // 2 - No tenemos idioma en cookie, usar idioma por defecto. NO RESTAURAR A STORE NI A COOKIE
    // ** LA FUENTE DE LA VERDAD PARA EL SELECTOR ES LA STORE, NO LA COOKIE, AUNQUE EL VALOR DE LA COOKIE SOBREESCRIBIRÁ EL VALOR DE LA STORE ONLOAD

    // PROCEDIMIENTO AL ELEGIR NUEVO IDIOMA:
    // 1 - CREAR ACCION DE LA NGRX STORE. DICHA ACCION LLEVARA COMO PAYLOAD EL IDIOMA SELECCIONADO
    // 2 - CREAR EFFECTO QUE REACCIONE A LA ACCION ANTERIOR. DICHO EFECTO ESTABLECERA LA COOKIE
    // 3 - CREAR REDUCER QUE ESTABLEZCA EL NUEVO VALOR DE LA STORE A PARTIR DE LA "STORE ANTERIOR" Y EL VALOR DEL PAYLOAD DE LA ACCION
  }

  onFilter($event) {

  }

  clearFilter($event) {

  }

  onSelected($event) {
    this.store.dispatch(ACTION_LOCALE.SET_LOCALE({
      iso: $event.value
    }))
  }

  getSelectedLangageNameFromIso(iso: string): string {
    const {name} = this?.locales?.[iso] || {}

    return name
  }

  getImgUrl(iso: string): string {
    return `assets/svg-country-flags/svg/${iso}.svg`
  }

  toLanguageArray(): LocaleType[] {
    return Object.values(this.locales || {})
  }
}
