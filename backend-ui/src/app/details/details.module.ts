import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardModule } from '@app/card/card.module'

import { DetailsComponent } from './details.component';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CardModule
  ],
  exports: [DetailsComponent],
})
export class DetailsModule { }
