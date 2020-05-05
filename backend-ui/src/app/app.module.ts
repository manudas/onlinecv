import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { WrapperModule } from './wrapper/wrapper.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    WrapperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
