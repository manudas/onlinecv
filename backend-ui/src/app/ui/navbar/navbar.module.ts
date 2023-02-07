import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { RouterModule } from '@angular/router'

import { NavbarComponent } from './navbar.component'
import { LanguageSelectorModule } from '@ui/language-selector/language-selector.module'
import { MenuModule } from '@ui/menu/menu.module'
import { MessageIndicatorModule } from '@ui/message-indicator/message-indicator.module'

import { TranslationServiceModule } from '@services/translation'

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MenuModule,
    MessageIndicatorModule,
    RouterModule,
    LanguageSelectorModule,
    TranslationServiceModule,
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
