import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MenuModule } from '../menu/menu.module'

import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    MenuModule,
    RouterModule,
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
