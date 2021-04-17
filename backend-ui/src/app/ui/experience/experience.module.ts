import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardModule } from '@app/ui/card/card.module'

import { TranslationsModule } from '@services/translation';

import { ExperienceComponent } from './experience.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UnderscoreModule } from '@app/services/underscore';

@NgModule({
  declarations: [
    ExperienceComponent,
  ],
  imports: [
    CardModule,
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    MatTableModule,
    TranslationsModule,
    UnderscoreModule,
  ],
  exports: [ExperienceComponent]
})
export class ExperienceModule { }
