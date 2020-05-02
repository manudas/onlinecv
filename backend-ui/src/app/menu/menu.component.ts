import { Component, OnInit, Input } from '@angular/core';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  MenuItem = MenuItemType;

  @Input() title: string = '';
  @Input() name: string = '';
  @Input() start_icon: IconDefinition = null;
  @Input() end_icon: IconDefinition = null;
  @Input() placement: string = 'bottom-left bottom-right top-left top-right';
  @Input() options: OptionsType[] = [];
  @Input() badge: string = null;
  @Input() image: string = null; // either data or url

  // Personalisation
  @Input() classBadge: string = '';
  @Input() classDropTongle: string = '';
  @Input() classStartIcon: string = '';
  @Input() classEndIcon: string = '';
  @Input() classDropDown: string = '';
  @Input() classHeader: string = '';
  @Input() classDivider: string = '';
  @Input() classImage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

export enum MenuItemType { option = 1, header = 2, separator = 3 }

type OptionsType = {
  name: string;
  url: string;
  type: MenuItemType;
  onclick: Function | string;
}