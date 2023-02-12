import { Component, OnInit } from '@angular/core'
import { faBars, faFlask, IconDefinition } from '@fortawesome/free-solid-svg-icons'

import { MenuListItems } from './config'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  faBars: IconDefinition = faBars
  faFlask: IconDefinition = faFlask

  openMenu: boolean = true

  menuItems = MenuListItems

  constructor() {}

  toggleMenu() {
    this.openMenu = !this.openMenu
  }
}
