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

  reportMenu = {
    name: 'ReportDropdown',
    start_icon: faFlagCheckered,
    title: 'Reports',
    caret: false,
    stylesStartIcon: 
        `font-size: 2.8em;
        display:block;
        width:100%;`,
    stylesDropToggle: 
        `
        padding:0;
        font-size: 0.8em; 
        display: block;
        width: 100%;
        border-right: 5px solid transparent;
        color: #ecf0f1;
        box-sizing: content-box;
        `,
    options: [
        {
            name: 'Launcher description',
            type: 'header',
        },
        {
          name: 'Action',
          url: '/Action',
          type: 'option',
        },
        {
          name: 'Another action',
          url: '/another-action',
          type: 'option',
        },
        {
          name: 'Something else here',
          url: '/something-else-here',
          type: 'option',
        }
      ]
  } 

  constructor() { }

  ngOnInit(): void {
  }

}
