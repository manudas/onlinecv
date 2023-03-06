import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export type MenuSelector = {
    icon:           IconDefinition
    iconSize?:      number
    options?:       Array<MenuOption>
    title:          string
    urlSegments?:   Array<string>
    position?:      DropDownPosition
    zIndex?:        number
    handlerInline?: boolean
}

export type MenuOption = {
    icon?:          IconDefinition
    type:           MenuOptionType
    title?:         string
    urlSegments?:   Array<string>
}

export enum MenuOptionType {
    header,
    option,
    separator
}

export enum DropDownPosition {
    down,
    right
}