import { Component, OnInit } from '@angular/core';
import {
  faBeer,
  faEnvelope,
  faCog,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faBeer = faBeer;
  faEnvelope = faEnvelope;
  faCog = faCog;
  faUser = faUser;
  userMenu = [
      {
          name: 'option',
          url: '/testoption',
          type: 'option',
      },
      {
        type: 'separator',
      },
      {
          name: 'option3',
          url: '/testoption',
          type: 'header',
      }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
