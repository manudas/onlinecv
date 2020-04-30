import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper.component';

import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    SidebarModule
  ],
  exports: [
    WrapperComponent,
  ]
})
export class WrapperModule { }
