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
import { detailsReducer } from '@store_reducers/Details'

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
      details: detailsReducer
    }, {}),
    EffectsModule.forRoot([DetailsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
