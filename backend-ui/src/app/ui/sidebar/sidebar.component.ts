import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';

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

  menuItems = MenuListItems

  constructor(private router: Router) {}

  routeIsActive(elementName){
    if (this.router.url === `\/${elementName}`){
      return "active";
    }
    return null;
  }
}
