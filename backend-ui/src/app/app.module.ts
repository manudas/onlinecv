import { environment } from '../environments/environment'; // Angular CLI environment
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

import { AppComponent } from './app.component'
import { NavbarModule } from './ui/navbar/navbar.module'
import { WrapperModule } from './ui/wrapper/wrapper.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { TranslationsModule } from '@services/translation'

import { DetailsEffects } from '@store_effects/Details'
import { LocaleEffects } from '@store_effects/Locale'
import { TranslationEffects } from '@store_effects/Translation'
import { reducer as detailsReducer } from '@store_reducers/Details'
import { reducer as localeReducer } from '@store_reducers/Locale'
import { reducer as translationReducer } from '@store_reducers/Translation'
import { reducer as messageReducer } from '@store_reducers/Message'

let dev = [
  StoreDevtoolsModule.instrument({
    maxAge: 25, // Retains last 25 states
  }),
];

if (environment.production) {
  dev = [];
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NavbarModule,
    WrapperModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      details: detailsReducer,
      locale: localeReducer,
      translation: translationReducer,
      message: messageReducer,
    }, {}),
    EffectsModule.forRoot([
      DetailsEffects,
      LocaleEffects,
      TranslationEffects,
    ]),
    TranslationsModule,
    MatSnackBarModule,

    ...dev
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
