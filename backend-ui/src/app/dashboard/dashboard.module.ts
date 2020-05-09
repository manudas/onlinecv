import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WidgetsModule } from '@app/widgets/widgets.module'
import { CardModule } from '@app/card/card.module'

import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    WidgetsModule,
    FontAwesomeModule,
    CardModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
