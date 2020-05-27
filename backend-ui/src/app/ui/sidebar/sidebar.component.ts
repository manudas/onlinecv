import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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



  trainingMenu = {
    name: 'TrainingDropdown',
    start_icon: faTable,
    title: 'Training',
    caret: false,
    stylesStartIcon: 
        `font-size: 2.7em;
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
    dropDownActiveOrFocusedToggleStyles:    
        {
          'transition-property': 'color',
          'transition-duration': '0.4s',
          'transition-timing-function': 'ease-in-out',
          'color': '#1abc9c'
        },
    options: [
        {
            name: 'Training',
            type: 'header',
        },
        {
          name: 'All',
          url: 'training',
          type: 'option',
        },
        {
          name: 'Regulated',
          url: 'training',
          urlSegments: 'regulated',
          type: 'option',
        },
        {
          name: 'Computer skills',
          url: 'training',
          urlSegments: 'computer',
          type: 'option',
        },
        {
          name: 'Other skills',
          url: 'training',
          urlSegments: 'others',
          type: 'option',
        }
      ]
  }


  experienceMenu = {
    name: 'ExperienceDropdown',
    start_icon: faFlagCheckered,
    title: 'Experience',
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
    dropDownActiveOrFocusedToggleStyles:    
        {
          'transition-property': 'color',
          'transition-duration': '0.4s',
          'transition-timing-function': 'ease-in-out',
          'color': '#1abc9c'
        },
    options: [
        {
            name: 'Professional & others',
            type: 'header',
        },
        {
          name: 'All',
          url: 'experience',
          type: 'option',
        },
        {
          name: 'Professional',
          url: 'training',
          experience: 'professional',
          type: 'option',
        },
        {
          name: 'Ongs',
          url: 'experience',
          urlSegments: 'ong',
          type: 'option',
        },
        {
          name: 'Other experiences',
          url: 'experience',
          urlSegments: 'others',
          type: 'option',
        }
      ]
  } 

  constructor(private router: Router) { }

  getRoute(elementName){
    if (this.router.url === `\/${elementName}`){
      return "active";
    }
    return null;
  }

  ngOnInit(): void {
  }

}
