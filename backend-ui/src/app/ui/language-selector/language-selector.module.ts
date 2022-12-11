import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    CookieService
} from 'ngx-cookie-service'

import {
    FormsModule
} from '@angular/forms';
import {
    MatIconModule
} from '@angular/material/icon'
import {
    MatSelectModule
} from '@angular/material/select'
import {
    TranslationServiceModule
} from '@services/translation';

import {
    LanguageSelectorComponent
} from './language-selector.component'

@NgModule({
    declarations: [LanguageSelectorComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
        TranslationServiceModule,
    ],
    exports: [LanguageSelectorComponent],
    providers: [CookieService],
})
export class LanguageSelectorModule {}