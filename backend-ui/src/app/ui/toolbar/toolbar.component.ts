import { Component, OnInit } from '@angular/core';

import {
  faBuilding,
  faLaptopCode,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faLemon,
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  faBuilding = faBuilding;
  faLaptopCode = faLaptopCode;

  faCalendarAlt = faCalendarAlt;
  faLemon = faLemon;

  constructor() { }

  ngOnInit(): void {
  }

}
