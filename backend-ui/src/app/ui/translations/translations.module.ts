import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardModule } from '@app/ui/card/card.module'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'

import { TranslationsModule } from '@services/translation';

import { TranslationsComponent } from './translations.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UnderscoreModule } from '@app/services/underscore';

import { TranslationsDialogComponent } from './translations-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TranslationsComponent,
    TranslationsDialogComponent,
  ],
  imports: [
    CardModule,
    ConfirmModule,
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    MatTableModule,
    ReactiveFormsModule,
    TranslationsModule,
    UnderscoreModule,
  ],
  exports: [TranslationsComponent]
})
export class translationsModule { }
