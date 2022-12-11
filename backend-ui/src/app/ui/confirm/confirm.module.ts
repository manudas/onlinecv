import {
    CommonModule
} from '@angular/common';
import {
    NgModule
} from '@angular/core'

import {
    TranslationServiceModule
} from '@services/translation'
import {
    ConfirmComponent
} from '@app/ui/confirm/confirm.component'


@NgModule({
    declarations: [
        ConfirmComponent,
    ],
    imports: [
        CommonModule,
        TranslationServiceModule,
    ],
    exports: [ConfirmComponent],
})
export class ConfirmModule {}