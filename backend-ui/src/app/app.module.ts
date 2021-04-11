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
// dialog will be used all along the app, so better to import here and reuse
import { MatDialogModule } from '@angular/material/dialog'

import { TranslationsModule } from '@services/translation'

import { DetailsEffects } from '@store_effects/Details'
import { LocaleEffects } from '@store_effects/Locale'
import { TranslationEffects } from '@store_effects/Translation'
import { SocialNetworksEffects } from '@store_effects/SocialNetworks'

import { reducer as detailsReducer } from '@store_reducers/Details'
import { reducer as localeReducer } from '@store_reducers/Locale'
import { reducer as translationReducer } from '@store_reducers/Translation'
import { reducer as messageReducer } from '@store_reducers/Message'
import { reducer as socialNetworkReducer } from '@store_reducers/SocialNetworks'

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
    BrowserAnimationsModule,
    EffectsModule.forRoot([
      DetailsEffects,
      LocaleEffects,
      TranslationEffects,
      SocialNetworksEffects,
    ]),
    HttpClientModule,

    MatDialogModule,
    MatSnackBarModule,
    NavbarModule,
    StoreModule.forRoot({
      details: detailsReducer,
      locale: localeReducer,
      translation: translationReducer,
      message: messageReducer,
      socialNetworks: socialNetworkReducer,
    }, {}),
    TranslationsModule,

    WrapperModule,
    ...dev
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
