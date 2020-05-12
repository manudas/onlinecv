import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardModule } from '@app/card/card.module'

import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CardModule
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
