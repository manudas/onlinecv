import { Component, OnInit } from '@angular/core';

import {
  faBeer,
  faSyncAlt,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faBeer = faBeer;
  faSyncAlt= faSyncAlt;
  faChevronDown = faChevronDown;
  
  constructor() { }

  ngOnInit(): void {
  }

}
