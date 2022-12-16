import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatLegacyTableModule as MatTableModule } from "@angular/material/legacy-table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { /*FormsModule,*/ ReactiveFormsModule } from '@angular/forms'

import { CardModule } from '@app/ui/card/card.module'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'

import { TranslationServiceModule } from '@services/translation';

import { TrainingComponent } from './training.component';
import { TrainingDialogComponent } from './training-dialog.component';
import { UnderscoreModule } from '@app/services/underscore';

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
    TranslationServiceModule,
    UnderscoreModule,
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
