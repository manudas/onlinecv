import { Component, OnInit } from '@angular/core';
import {
  faBeer,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faBeer = faBeer;
  faEnvelope = faEnvelope;

  constructor() { }

  ngOnInit(): void {
  }

}
