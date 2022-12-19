import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { LanguageSelectorModule } from '@ui/language-selector/language-selector.module';
import { MenuModule } from '.././menu/menu.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MenuModule,
    RouterModule,
    LanguageSelectorModule,
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
