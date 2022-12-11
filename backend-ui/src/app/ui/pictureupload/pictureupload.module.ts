import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';

import {
    TranslationServiceModule
} from '@services/translation'

import {
    PictureuploadComponent
} from './pictureupload.component'
import {
    ConfirmComponent
} from './confirm.component'
@NgModule({
    declarations: [
        PictureuploadComponent,
        ConfirmComponent,
    ],
    imports: [
        CommonModule,
        TranslationServiceModule
    ],
    exports: [PictureuploadComponent]
})
export class PictureuploadModule {}