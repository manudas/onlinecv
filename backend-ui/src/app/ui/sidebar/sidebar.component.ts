import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  faBars,
  faBug,
  faCloud,
  faFlask,
  faTachometerAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import {
  faFileAlt
} from '@fortawesome/free-regular-svg-icons';

import { MenuListItems } from './config'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faBars: IconDefinition = faBars
  faBug: IconDefinition = faBug
  faCloud: IconDefinition = faCloud
  faFlask: IconDefinition = faFlask
  faFileAlt: IconDefinition = faFileAlt
  faTachometerAlt: IconDefinition = faTachometerAlt

  sidebar_icon = 'sidebar_icons';

  menuItems = MenuListItems

  constructor(private router: Router) {}

  getRoute(elementName){
    if (this.router.url === `\/${elementName}`){
      return "active";
    }
    return null;
  }

  ngOnInit(): void {
  }

}
