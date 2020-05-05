import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToolbarComponent } from './toolbar.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    BreadcrumbModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
