import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    BreadcrumbModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
