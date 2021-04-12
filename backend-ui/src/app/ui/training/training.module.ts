import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { /*FormsModule,*/ ReactiveFormsModule } from '@angular/forms'

import { CardModule } from '@app/ui/card/card.module'

import { TranslationsModule } from '@services/translation';

import { TrainingComponent } from './training.component';
import { TrainingDialogComponent } from './training-dialog.component';

@NgModule({
  declarations: [
    TrainingComponent,
    TrainingDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    CardModule,
    ReactiveFormsModule,
    TranslationsModule,
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
