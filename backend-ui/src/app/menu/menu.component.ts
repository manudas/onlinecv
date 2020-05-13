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
  @Input() stylesBadge: string | object= '';
  @Input() stylesDropToggle: string | object= '';
  @Input() stylesDropToggleOnFocus: string | object= '';
  @Input() stylesStartIcon: string | object= '';
  @Input() stylesEndIcon: string | object= '';
  @Input() stylesDropDown: string | object= '';
  @Input() stylesHeader: string | object= '';
  @Input() stylesOption: string | object= '';
  @Input() stylesDivider: string | object= '';
  @Input() stylesImage: string | object= '';
  @Input() stylesDropDownMenu: string = '';
  // On special events styles
  @Input() dropDownActiveOrFocusedToggleStyles: object = {};

  constructor() { }

  onDropDownToggleMouseOver(e){
    this.dropDownToggleFocused = true;
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
  onDropDownToggleClick(e){
    this.dropDownToggleFocused = true;
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
  onDropDownToggleMouseLeave(e){
    this.dropDownToggleFocused = false;
    e.stopPropagation();
    e.preventDefault();
    return false;
  }
  onDropDownActiveOrFocusedToggleStyles(){
    if (this.dropDownToggleFocused) {
      let previousStyles = null;
      if (typeof this.stylesDropToggle == 'string' || this.stylesDropToggle instanceof String) {
        previousStyles = this.parseStyleStringToObject(this.stylesDropToggle);
      } else {
        previousStyles = this.stylesDropToggle;
      }
      return {...previousStyles, ...this.dropDownActiveOrFocusedToggleStyles};
    } else {
      if (typeof this.stylesDropToggle == 'string' || this.stylesDropToggle instanceof String) {
        return this.parseStyleStringToObject(this.stylesDropToggle);
      }
      // is an object and is not emtpy
      return this.stylesDropToggle;
    }
  }

  private parseStyleStringToObject(styleString: String){
    const result = {},
    attributes = styleString.trim().split(';');

    for (let i = 0; i < attributes.length; i++) {
        if (attributes[i].trim().length == 0) continue;
        var entry = attributes[i].split(':').map(attr => attr.trim());
        result[entry.splice(0,1)[0]] = entry.join(':');
    }
    return result;
  }

  getRouterUrl(option) {
    const routerLinkAddress = [];
    if (option.url) {
      routerLinkAddress.push(option.url);
      if (option.urlSegments) {
        routerLinkAddress.push(option.urlSegments);
      }
    }
    return routerLinkAddress;
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