import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { MenuComponent } from './menu.component'

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
