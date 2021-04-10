import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslationsModule } from '@services/translation'

import { PictureuploadComponent } from './pictureupload.component'

@NgModule({
  declarations: [PictureuploadComponent],
  imports: [
    CommonModule,
    TranslationsModule
  ],
  exports: [PictureuploadComponent]
})
export class PictureuploadModule { }
