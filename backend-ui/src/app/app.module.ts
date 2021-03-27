import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { NavbarModule } from './ui/navbar/navbar.module';
import { WrapperModule } from './ui/wrapper/wrapper.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DetailsEffects } from '@store_effects/Details'
import { LocaleEffects } from '@store_effects/Locale'
import { reducer as detailsReducer } from '@store_reducers/Details';
import { reducer as localeReducer } from '@store_reducers/Locale';

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
    }, {}),
    EffectsModule.forRoot([
      DetailsEffects,
      LocaleEffects,
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
