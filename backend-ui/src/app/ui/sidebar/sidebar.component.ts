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
          name: 'Official',
          url: 'training',
          urlSegments: 'official',
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
          urlSegments: 'proffesional',
          type: 'option',
        },
        {
          name: 'Professional',
          url: 'experience',
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

  othersMenu = {
    name: 'OthersDropdown',
    start_icon: faBookmark,
    title: 'Others',
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
            name: 'Others',
            type: 'header',
        },
        {
          name: 'All',
          url: 'others',
          type: 'option',
        },
        {
          name: 'Resume summary',
          url: 'others',
          urlSegments: 'resume-summary',
          type: 'option',
        },
        {
          name: 'Skills',
          url: 'others',
          urlSegments: 'Skills',
          type: 'option',
        },
        {
          name: 'Computer skills',
          url: 'others',
          urlSegments: 'computer-skills',
          type: 'option',
        },
        {
          name: 'Languages',
          url: 'others',
          urlSegments: 'languages',
          type: 'option',
        },
        {
          name: 'Merits',
          url: 'others',
          urlSegments: 'merits',
          type: 'option',
        },
        {
          name: 'Ongs',
          url: 'others',
          urlSegments: 'ongs',
          type: 'option',
        },
        {
          name: 'Proffesional archivements',
          url: 'others',
          urlSegments: 'professional-archivements',
          type: 'option',
        },
        {
          name: 'Proffesional references',
          url: 'others',
          urlSegments: 'proffesional-references',
          type: 'option',
        },
        {
          name: 'Other data',
          url: 'others',
          urlSegments: 'other-data',
          type: 'option',
        }
      ]
  }

  constructor(private router: Router) {
    console.log('estilos repetidos, mucho codigo a mejorar en sidebar, podríamos sacarlos a un archivo constants.js y limpiar sidebar.component?');
  }

  getRoute(elementName){
    if (this.router.url === `\/${elementName}`){
      return "active";
    }
    return null;
  }

  ngOnInit(): void {
  }

}
