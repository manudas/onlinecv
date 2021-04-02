import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // remove when in menumodule

import { NavbarComponent } from './navbar.component';
import { LanguageSelectorModule } from '@ui/language-selector/language-selector.module';
import { MenuModule } from '.././menu/menu.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MenuModule,
    NgbModule,
    LanguageSelectorModule,
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
