import { Validators } from '@angular/forms'
import { AcceptedTypes } from '@app/ui/dialog/dialog.component'
import { assessmentFromOneToTen } from '@utils/commonFormValidators'

export const colsToRender            = [ 'name', 'certification', 'school', 'edit', 'delete', 'order' ]
export const dataInputs              = [ 'id', 'name', 'language', 'certification', 'school', 'school_url', 'spoken_level', 'written_level' ]
export const dataDefaultInputValues  = new Map()
export const dataDefaultInputTypes   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', ['hidden']],
    ['name', ['fullsize']],
    ['language', ['hidden']],
    ['certification', ['fullsize']],
    ['school', ['fullsize']],
    ['school_url', ['fullsize']],
    ['spoken_level', ['fullsize', 'number']],
    ['written_level', ['fullsize', 'number']],
])
export const dataInputValidators     = new Map([ ['name', [Validators.required]], ['language', [Validators.required]], ['spoken_level', [assessmentFromOneToTen]], ['written_level', [assessmentFromOneToTen]] ])
export const dataInputErrors         = new Map([
    ['name', 'You should provide a valid language name'],
    ['spoken_level', 'Out of range, should be between 1 and 10 or empty'],
    ['written_level', 'Out of range, should be between 1 and 10 or empty']
])
export const dataInputPlaceholders = new Map([
    ['name', 'Enter the language name'],
    ['certification', 'Optional: have you certificated your level for this language?'],
    ['school', 'Optional: the school you studied this language'],
    ['school_url', 'Optional: the web address of your school'],
    ['spoken_level', 'Optional: from 1 to 10, how well you speak this language'],
    ['written_level', 'Optional: from 1 to 10, how well you write this language'],
])

export const dataInputLabels = new Map([
    ['name', 'Language'],
    ['certification', 'Certification'],
    ['school', 'Have you attended to classes in any school for this language?'],
    ['school_url', 'Does the school have a web page?'],
    ['spoken_level', 'Would you assess yourself in the spoken language?'],
    ['written_level', 'Would you assess yourself in the written language?'],
])
export const dataInputHelpBlocks = new Map([
    ['name', 'E.g: English'],
    ['certification', 'E.g.: Cambridge B1, ILTS B2, C1, Proficient, Advanced... and so on'],
    ['school', 'E.g.: Official Language School of Palma de Mallorca'],
    ['school_url', 'E.g.: https://eoipalma.com'],
    ['spoken_level', 'E.g.: 7.5'],
    ['written_level', 'E.g.: 8'],
])