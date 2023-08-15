import { Validators } from '@angular/forms'
import { AcceptedTypes, assertValidAcceptedTypes, ValidAcceptedTypes } from '../dialog/helpers'

export const colsToRender            = [ 'name', 'description', 'edit', 'delete', 'order' ]
export const dataInputs              = [ 'id', 'name', 'url', 'description', 'keywords', 'pictures' ]

export const dataDefaultInputValues  = new Map([ ['pictures', []] ])

export const dataDefaultInputTypes   = new Map<string, ValidAcceptedTypes<AcceptedTypes[]>>([
    ['id', assertValidAcceptedTypes<['hidden']>(['hidden'])],
    ['description', assertValidAcceptedTypes<['fullsize', 'textarea']>(['fullsize', 'textarea'])],
    // ['url', assertValidAcceptedTypes<['fullsize']>(['fullsize'])],
    ['keywords', assertValidAcceptedTypes<['fullsize', 'taglist']>(['fullsize', 'taglist'])],
    ['pictures', assertValidAcceptedTypes<['carousel']>(['carousel'])],
])
export const dataInputValidators     = new Map([
    ['name', [Validators.required]],
    ['description', [Validators.required]],
    ['pictures', [Validators.required]]
])

export const dataInputErrors            = new Map([
    ['name', 'You should provide a name for your portfolio'],
    ['description', 'You should provide a description for this portfolio entry'],
    ['pictures', 'At least one image is needed in a portfolio']
])
export const dataInputPlaceholders      = new Map([
    ['name', 'Enter the name of your project for this portfolio'],
    ['url', 'Optional: do you have a url for your work to be checked?'],
    ['description', 'Description of your project'],
    ['keywords', 'Separated by comma or enter'],
])
export const dataInputLabels            = new Map([
    ['name', 'Add your portfolio name'],
    ['url', 'Please enter an address to check your work'],
    ['description', 'You can add a brief description of your project here'],
    ['pictures', 'You need to upload at least one image to your portfolio'],
    ['keywords', 'Describe your work, used technologies and skills with a list of separated words'],
])
export const dataInputHelpBlocks        = new Map([
    ['name', 'Eg: Telerosa Spain SL'],
    ['url', 'Eg: www.telerosa.com'],
    ['description', 'Eg: Online florist in which I been working for teen years. Created a list of new modules for the customer to choose the best flower bouquet at the best price'],
    ['keywords', 'Eg: PHP; JavaScript; Web, Java, Angular, NodeJS'],
])
