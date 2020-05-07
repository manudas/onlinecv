import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardComponent } from './dashboard.component';

import { WidgetsModule } from '@app/widgets/widgets.module'


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    WidgetsModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
