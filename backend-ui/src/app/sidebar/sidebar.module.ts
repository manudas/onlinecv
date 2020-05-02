import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuModule } from '../menu/menu.module'

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    MenuModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
