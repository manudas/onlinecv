import { Validators } from "@angular/forms"
import { AcceptedTypes, assertValidAcceptedTypes, DialogButtonDef } from "@app/ui/dialog/helpers"

export const colsToRender            = [ 'from', 'name', 'subject', 'message' ]
export const dataInputs              = [ 'id', 'from', 'name', 'to', 'date', 'subject', 'message', 'hasBeenRead', 'type' ]
export const dataDefaultInputValues  = new Map()
export const dataDefaultInputTypes   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', assertValidAcceptedTypes<['hidden']>(['hidden'])],
    ['hasBeenRead', assertValidAcceptedTypes<['hidden']>(['hidden'])],
    ['type', assertValidAcceptedTypes<['hidden']>(['hidden'])],
    ['subject', assertValidAcceptedTypes<['fullsize']>(['fullsize'])],
    ['date', assertValidAcceptedTypes<['date', 'disabled']>(['date', 'disabled'])],
    ['message', assertValidAcceptedTypes<['fullsize', 'textarea']>(['fullsize', 'textarea'])]
])
export const dataInputValidators     = new Map([
    ['from', [Validators.email, Validators.required]],
    ['to', [Validators.email, Validators.required]],
    ['name', [Validators.required]],
    ['subject', [Validators.required]],
    ['message', [Validators.required]],
])
export const dataInputErrors         = new Map([
    ['from', 'Invalid email address'],
    ['to', 'Invalid email address'],
    ['name', 'A name for remittent is required'],
    ['subject', 'A message will require a subject'],
    ['message', 'Please type a message'],
])
export const dataInputPlaceholders = new Map([
    ['from', 'Enter the origin email'],
    ['name', 'Enter your name as a sender'],
    ['to', 'Destination email'],
    // ['date', 'Date of the sending'],
    ['subject', 'Enter a subject'],
    ['message', 'Enter a message'],
])
export const dataInputLabels = new Map([
    ['from', 'From'],
    ['name', 'Name'],
    ['to', 'To'],
    ['date', 'Date'],
    ['subject', 'Subject'],
    ['message', 'Message'],
])
export const dataInputHelpBlocks = new Map([
    ['from', 'Eg: manuel.anguita@xovis.com'],
    ['name', 'Eg: Jörg'],
    ['to', 'Eg: jorg@xovis.com'],
    ['subject', 'Eg: About the Fullstack Engineer role'],
    ['message', 'Eg: Thank you for your message, please send the specs of the role to this email'],
])
export const buttonList = ['Cancel', 'Send']
export const buttonMetaData = new Map<string, DialogButtonDef>([
    ['Cancel', { action: 'close', text: 'Cancel', class: 'btn-outline-info' }],
    ['Send', { action: 'submit', text: 'Send', position: 'right', class: 'submitButton' }]
])
export const title = 'Send a message'