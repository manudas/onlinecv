import { Component, Input } from '@angular/core'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { MenuOption, MenuSelector, MenuOptionType, DropDownPosition } from './types'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements MenuSelector {

  @Input()
  icon:             IconDefinition
  @Input()
  iconSize:         number
  @Input()
  options:          MenuOption[]        = []
  @Input()
  title:            string
  @Input()
  urlSegments:      string[]            = []
  @Input()
  position:         DropDownPosition    = DropDownPosition.right
  @Input()
  zIndex:           number              = 1
  @Input()
  handlerInline:    boolean             = false

  MenuOptionType                        = MenuOptionType
  DropDownPosition                      = DropDownPosition

  constructor() { }

  getRouterUrl(option?: MenuOption) {
    if(!option) { // handler element
      return [...(this.urlSegments ?? [])]
    } else if (option.urlSegments) { // option element with URL
      return [...(this.urlSegments ?? []), ...(option.urlSegments ?? [])]
    }
    return []
  }
}