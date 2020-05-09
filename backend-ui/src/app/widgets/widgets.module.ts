import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProgressBarComponent } from '@app/progress-bar/progress-bar.component';
import { DoughnutChartComponent } from '@app/doughnutchart/doughnutchart.component';


@NgModule({
  declarations: [
    ProgressBarComponent,
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    ProgressBarComponent,
    DoughnutChartComponent,
  ]
})
export class WidgetsModule { }
