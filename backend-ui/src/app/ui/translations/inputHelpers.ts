import { Validators } from '@angular/forms'
import { TranslationEnum } from '@app/types'
import { AcceptedTypes } from '@app/ui/dialog/dialog.component'

export const colsToRender            = new Map<TranslationEnum, string[]>([
    [TranslationEnum.missing, [ 'module', 'domain', 'tag', 'lastTimeFetched', 'accessCounter', 'edit', 'delete' ]],
    [TranslationEnum.translated, [ 'module', 'domain', 'tag', 'text', 'lastTimeFetched', 'accessCounter', 'edit', 'delete' ]]
])
export const dataInputs              = [ 'id', 'domain', 'tag', 'module', 'text' ]
export const dataDefaultInputValues  = new Map()
export const dataDefaultInputTypes_missing   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', ['hidden']],
    ['domain', ['readonly']],
    ['tag', ['readonly']],
    ['module', ['readonly']],
])
export const dataDefaultInputTypes_translated   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', ['hidden']],
])
export const dataDefaultInputTypes = dataDefaultInputTypes_missing
export const dataDefaultInputTypesByTranslationType   = new Map<TranslationEnum, Map<string, AcceptedTypes | AcceptedTypes[]>>([
    [TranslationEnum.missing, dataDefaultInputTypes_missing],
    [TranslationEnum.translated, dataDefaultInputTypes_translated],
])
export const dataInputValidators     = new Map([ ['tag', [Validators.required]], ['text', [Validators.required]] ])
export const dataInputErrors         = new Map([ ['tag', 'A tag for the translation is mandatory'], ['text', 'Providing the actual translation is mandatory'] ])
export const dataInputPlaceholders = new Map([
    ['domain', 'Optional: Enter the domain'],
    ['tag', 'The tag of your translation'],
    ['module', 'Optional: which is the module that this translation belongs to?'],
    ['text', 'Your actual translation for the selected language'],
])
export const dataInputLabels = new Map([
    ['domain', 'Add the translation domain'],
    ['tag', 'Please add the translation tag'],
    ['module', 'Please type the belonging module'],
    ['text', 'Provide your translation for the selected language'],
])
export const dataInputHelpBlocks = new Map([
    ['domain', 'E.g: FRONTEND-UI or BACKEND-UI'],
    ['tag', 'This is usually the original word in the main language'],
    ['module', 'E.g.: TranslationEffect'],
    ['text', 'E.g.: Traducción'],
])
export const transformFn = new Map([
    ['lastTimeFetched', function getLocaleDateFromTimestamp ( timestamp: string ) { return new Date( Number(timestamp) ).toLocaleDateString() }],
])