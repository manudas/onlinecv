import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WrapperComponent } from './wrapper.component';

import { SidebarModule } from '../sidebar/sidebar.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { WrapperRoutingModule } from '../wrapper-router/wrapper-routing.module';


@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    SidebarModule,
    ToolbarModule
  ],
  exports: [
    WrapperComponent,
  ]
})
export class WrapperModule { }
