import { ValidationErrors, Validators } from '@angular/forms'
import { AcceptedTypes } from '@app/ui/dialog/dialog.component'
import { assessmentFromOneToTen } from '@utils/commonFormValidators'

export const colsToRender            = [ 'name', 'company', 'edit', 'delete', 'order' ]
export const dataInputs              = [ 'id', 'name', 'role', 'description', 'company', 'company_url', 'phone', 'email' ]
export const dataDefaultInputValues  = new Map()
export const dataDefaultInputTypes   = new Map<string, AcceptedTypes | AcceptedTypes[]>([
    ['id', ['hidden']],
])
export const dataInputValidators     = new Map([ ['name', [Validators.required]] ])
export const dataInputErrors         = new Map([
    ['name', 'You should provide a name for your reference'],
    ['phone', 'Either a phone or an email address must be entered'],
    ['email', 'Either a phone or an email address must be entered']
])
export const dataInputPlaceholders = new Map([
    ['name', 'Enter the name of your reference'],
    ['role', 'Optional: your reference role'],
    ['description', 'Optional: description of your reference within the related work'],
    ['company', 'Optional: the company in which you worked with your reference'],
    ['company_url', 'Optional: you could include your company web address here'],
    ['phone', 'Add either your reference phone or email'],
    ['email', 'Add either your reference phone or email'],
])
export const dataInputLabels = new Map([
    ['name', 'Add your reference name'],
    ['role', 'Please enter the role of your reference'],
    ['description', 'You can add a brief description of your reference here'],
    ['company', 'Provide your company or project name'],
    ['company_url', 'Do you worked for a company or project with a web page?'],
    ['phone', 'Your reference phone number'],
    ['email', 'Your reference email'],
])
export const dataInputHelpBlocks = new Map([
    ['name', 'Jörg'],
    ['role', 'E.g.: Group lead, team manager...'],
    ['description', 'Eg: worked together for two year as a manager and team member'],
    ['company', 'Eg: Google Inc'],
    ['company_url', 'E.g.: http://888sport.es'],
    ['phone', 'E.g.: +34 XXX XXX XXX'],
    ['email', 'E.g.: info@xovis.com'],
])

export const formValidator = function validatorEmailOrPhone(dataFormGroup): ValidationErrors | null {
    // no email and no phone, not allowed
    const emailOrPhone = !dataFormGroup?.get('email').value?.trim() && !dataFormGroup?.get('phone').value?.trim()
    if (emailOrPhone) { dataFormGroup?.get('email').setErrors({ emailOrPhone: { value: true } }); dataFormGroup?.get('phone').setErrors({ emailOrPhone: { value: true } }) }
    else dataFormGroup?.get('email').setErrors(null); dataFormGroup?.get('phone').setErrors(null)

    return emailOrPhone ? { emailOrPhone: { value: true } } : null
}