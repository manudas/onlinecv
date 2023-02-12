import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms'

import { CardModule } from '@app/ui/card/card.module'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'

import { TranslationServiceModule } from '@services/translation';

import { TrainingComponent } from './training.component';
import { TrainingDialogComponent } from './training-dialog.component';
import { SpecialCharsModule } from '@app/services/specialChars';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TrainingComponent,
    TrainingDialogComponent,
  ],
  imports: [
    ConfirmModule,
    CommonModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    FontAwesomeModule,
    CardModule,
    ReactiveFormsModule,
    SpecialCharsModule,
    TranslationServiceModule,
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
