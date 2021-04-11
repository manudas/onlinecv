import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationsModule } from '@services/translation'

import { PictureuploadComponent } from './pictureupload.component'
import { ConfirmComponent } from './confirm.component'
@NgModule({
  declarations: [
    PictureuploadComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    TranslationsModule
  ],
  exports: [PictureuploadComponent]
})
export class PictureuploadModule { }
