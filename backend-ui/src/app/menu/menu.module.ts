import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
