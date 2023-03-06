import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'

import { TranslationServiceModule } from '@services/translation';
import { LanguageSelectorComponent } from './language-selector.component'

@NgModule({
    declarations: [LanguageSelectorComponent],
    imports: [
        CommonModule,
        TranslationServiceModule,
    ],
    exports: [LanguageSelectorComponent],
    providers: [CookieService],
})
export class LanguageSelectorModule { }