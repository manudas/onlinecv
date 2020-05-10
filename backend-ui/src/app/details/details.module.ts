import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardModule } from '@app/card/card.module'

import { DetailsComponent } from './details.component';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    CardModule
  ],
  exports: [DetailsComponent],
})
export class DetailsModule { }
