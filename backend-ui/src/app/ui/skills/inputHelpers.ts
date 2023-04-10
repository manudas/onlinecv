import { Validators } from '@angular/forms'
import { AcceptedTypes, assertValidAcceptedTypes } from '@app/ui/dialog/helpers'
import { assessmentFromOneToTen } from '@utils/commonFormValidators'

export const colsToRender            = [ 'tag', 'description', 'skill_level', 'edit', 'delete', 'order' ]
export const dataInputs              = [ 'id', 'type', 'tag', 'description', 'skill_level' ]
export const dataDefaultInputValues  = new Map()
export const dataDefaultInputTypes   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', assertValidAcceptedTypes<['hidden']>(['hidden'])],
    ['type', assertValidAcceptedTypes<['hidden']>(['hidden'])],
    ['tag', assertValidAcceptedTypes<['fullsize']>(['fullsize'])],
    ['description', assertValidAcceptedTypes<['fullsize']>(['fullsize'])],
    ['skill_level', assertValidAcceptedTypes<['number', 'fullsize']>(['number', 'fullsize'])],
])
export const dataInputValidators     = new Map([ ['tag', [Validators.required]], ['type', [Validators.required]], ['skill_level', [assessmentFromOneToTen]] ])
export const dataInputErrors         = new Map([ ['tag', 'You should provide a valid tag for your skill'], ['skill_level', 'Out of range, should be between 1 and 10 or empty'] ])
export const dataInputPlaceholders = new Map([
    ['tag', 'Enter the skill name'],
    ['description', 'Optional: a brief description of your skill'],
    ['skill_level', 'Optional: you can grade yourself on this skill'],
])
export const dataInputLabels = new Map([
    ['tag', 'Tag your skill'],
    ['description', 'Please enter a description'],
    ['skill_level', 'Please assess yourself from 1 to 10 on this skill'],
])
export const dataInputHelpBlocks = new Map([
    ['tag', 'E.g: Drawing aircrafts'],
    ['description', 'E.g.: I love to draw aircrafts with even the smallest detail'],
    ['skill_level', 'E.g.: 10'],
])