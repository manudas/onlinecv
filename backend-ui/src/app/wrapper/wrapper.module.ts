import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from '../sidebar/sidebar.module';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { WrapperRoutingModule } from '../wrapper-router/wrapper-routing.module';

import { WrapperComponent } from './wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    SidebarModule,
    ToolbarModule,
  ],
  exports: [
    WrapperComponent,
  ]
})
export class WrapperModule { }
