import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PictureuploadComponent } from './pictureupload.component'


@NgModule({
  declarations: [PictureuploadComponent],
  imports: [
    CommonModule
  ],
  exports: [PictureuploadComponent]
})
export class PictureuploadModule { }
