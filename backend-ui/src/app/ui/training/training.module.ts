import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { /*FormsModule,*/ ReactiveFormsModule } from '@angular/forms'

import { CardModule } from '@app/ui/card/card.module'

import { TranslationsModule } from '@services/translation';

import { TrainingComponent } from './training.component';
import { TrainingDialogComponent } from './training-dialog.component';
import { UnderscoreModule } from '@app/services/underscore';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  declarations: [
    TrainingComponent,
    TrainingDialogComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    CardModule,
    ReactiveFormsModule,
    TranslationsModule,
    UnderscoreModule,
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
