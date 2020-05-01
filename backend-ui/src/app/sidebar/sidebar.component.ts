import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faTachometerAlt,
  faTable,
  faFlagCheckered,
  faBookmark,
  faCloud,
  faBug,
  faFlask
} from '@fortawesome/free-solid-svg-icons';

import {
  faFileAlt
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faBars = faBars;
  faTachometerAlt = faTachometerAlt;
  faFileAlt = faFileAlt;
  faTable = faTable;
  faFlagCheckered = faFlagCheckered;
  faBookmark = faBookmark;
  faCloud = faCloud;
  faBug = faBug;
  faFlask = faFlask;

  sidebar_icon = 'sidebar_icons';

  constructor() { }

  ngOnInit(): void {
  }

}
