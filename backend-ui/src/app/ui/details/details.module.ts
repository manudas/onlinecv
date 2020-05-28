import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardModule } from '@app/ui/card/card.module'
import { PictureuploadModule } from '@app/ui/pictureupload/pictureupload.module'

import { DetailsComponent } from './details.component';

import { DataService } from '@services/data/data.service'

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    CardModule,
    PictureuploadModule
  ],
  exports: [DetailsComponent],
  providers: [DataService]
})
export class DetailsModule { }
