import { Validators } from '@angular/forms'
import { AcceptedTypes } from '@app/ui/dialog/dialog.component'

export const colsToRender            = [ 'tag', 'description', 'skill_level', 'edit', 'delete', 'order' ]
export const dataInputs              = ['id', 'type', 'role', 'description', 'start_date', 'finish_date', 'company', 'company_url', 'details']
export const dataDefaultInputValues  = new Map([ ['details', []] ])
export const dataDefaultInputTypes   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', ['hidden']],
    ['type', ['hidden']],
    ['start_date', ['date', 'readonly']],
    ['finish_date', ['date', 'readonly']],
    ['details', ['fullsize']]
])
export const dataInputValidators     = new Map([ ['type', [Validators.required]], ['role', [Validators.required]] ])
export const dataInputErrors         = new Map([ ['role', 'You should provide a valid role for your experience'] ])
export const dataInputPlaceholders = new Map([
    ['role', 'Enter the role name'],
    ['description', 'Optional: a brief description of your experience'],
    ['start_date', 'Optional: the date you started to work in this role'],
    ['finish_date', 'Optional: the date in which you finished your experience'],
    ['company', 'Optional: the company you worked for, if any'],
    ['company_url', 'Optional: you could include your company web address here'],
    ['details', 'Optional: Used React to migrate from a server rendered app to a SPA...'],
])
export const dataInputLabels = new Map([
    ['role', 'Add your role'],
    ['description', 'Please enter a description'],
    ['start_date', 'Please your starting date on this role'],
    ['finish_date', 'Provide your finishing date for this role'],
    ['company', 'Would it be interesting to include the company name?'],
    ['company_url', 'Do you worked for a company with a web page?'],
    ['details', 'Detail your experience'],
])
export const dataInputHelpBlocks = new Map([
    ['role', 'E.g: Frontend engineer'],
    ['description', 'E.g.: Translating mockups to real world web apps'],
    ['start_date', 'Click on the toggle button to open the date selector'],
    ['finish_date', 'Click on the toggle button to open the date selector'],
    ['company', 'E.g.: 888 Spectate'],
    ['company_url', 'E.g.: http://888sport.es'],
    ['details', 'Add a more detailed description. Click more if you need to describe another scope'],
])