import { Component, OnInit, Input } from '@angular/core';
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

  @Input() userName: string = 'Username';

  faBeer = faBeer;
  faEnvelope = faEnvelope;
  faCog = faCog;
  faUser = faUser;

  messageMenu = {
    name: 'MessagesDropdown',
    start_icon: faEnvelope,
    title: 'Messages',
    badge: '5',
    options: [
        {
            name: 'New message',
            url: '/new-message',
            type: 'option',
        },
        {
          name: 'Inbox',
          url: '/inbox',
          type: 'option',
        },
        {
          name: 'Outbox',
          url: '/outbox',
          type: 'option',
        },
        {
          name: 'Trash',
          url: '/trash',
          type: 'option',
        }
      ]
  }

  userMenu = {
    name: 'UserDropdown',
    start_icon: faUser,
    title: this.userName,
    image: '//placehold.it/20x20/ccc/777',
    classDropToggle: 'test',
    options: [
        {
            name: 'Edit Profile',
            url: '/edit-profile',
            type: 'option',
        },
        {
          type: 'separator',
        },
        {
          name: 'Sign out',
          url: '/sign-out',
          type: 'option',
        }
      ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
