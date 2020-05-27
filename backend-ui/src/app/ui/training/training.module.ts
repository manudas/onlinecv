import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardModule } from '@app/ui/card/card.module'

import { TrainingComponent } from './training.component';

@NgModule({
  declarations: [TrainingComponent],
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    CardModule
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
