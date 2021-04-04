import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { /*FormsModule,*/ ReactiveFormsModule } from '@angular/forms';

import { CardModule } from '@app/ui/card/card.module'
import { PictureuploadModule } from '@app/ui/pictureupload/pictureupload.module'
import { TranslationsModule } from '@services/translation';

import { DetailsComponent } from './details.component';

import { DataService } from '@services/data/data.service'
import { SocialNetworkDialogComponent } from './social-network-dialog.component'

@NgModule({
  declarations: [DetailsComponent, SocialNetworkDialogComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    CardModule,
    PictureuploadModule,
    MatTableModule,
    ReactiveFormsModule,
    TranslationsModule,
  ],
  exports: [DetailsComponent],
  providers: [DataService]
})
export class DetailsModule { }
