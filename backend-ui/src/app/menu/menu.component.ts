import { Component, OnInit, Input } from '@angular/core';

import { IconDefinition } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  MenuItem = MenuItemType;
  dropDownToggleFocused

  @Input() title: string = '';
  @Input() name: string = '';
  @Input() start_icon: IconDefinition = null;
  @Input() end_icon: IconDefinition = null;
  @Input() placement: string = 'bottom';
  @Input() options: OptionsType[] = [];
  @Input() badge: string = null;
  @Input() image: string = null; // either data or url
  @Input() caret: boolean = true;

  // Personalisation
  @Input() stylesBadge: string = '';
  @Input() stylesDropToggle: string = '';
  @Input() stylesDropToggleOnFocus: string = '';
  @Input() stylesStartIcon: string = '';
  @Input() stylesEndIcon: string = '';
  @Input() stylesDropDown: string = '';
  @Input() stylesHeader: string = '';
  @Input() stylesOption: string = '';
  @Input() stylesDivider: string = '';
  @Input() stylesImage: string = '';
  @Input() stylesDropDownMenu: string = '';

  constructor() { }

  onDropDownToggleMouseOver(){
    this.dropDownToggleFocused = true;
    console.log("dentro");
  }
  onDropDownToggleClick(){
    this.dropDownToggleFocused = true;
    console.log("dentro");
  }
  onDropDownToggleMouseLeave(){
    this.dropDownToggleFocused = false;
    console.log("sale");
  }

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