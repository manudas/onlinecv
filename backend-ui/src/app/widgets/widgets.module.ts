import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProgressBarComponent } from '@app/progress-bar/progress-bar.component';

@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    ProgressBarComponent
  ]
})
export class WidgetsModule { }
