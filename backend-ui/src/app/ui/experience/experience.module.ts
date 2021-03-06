import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from "@angular/material/table";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardModule } from '@app/ui/card/card.module'

import { TranslationsModule } from '@services/translation';

import { ExperienceComponent } from './experience.component';

@NgModule({
  declarations: [
    ExperienceComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    CardModule,
    TranslationsModule,
  ],
  exports: [ExperienceComponent]
})
export class ExperienceModule { }
