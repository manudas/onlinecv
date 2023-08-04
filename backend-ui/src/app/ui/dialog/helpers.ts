import { ValidatorFn } from "@angular/forms"

/* Strong typing helpers for Data Dialog Inputs */
type InputType = 'date' | 'number' | 'textarea' | 'taglist' | 'array'
type InternalAcceptedTypes = 'hidden' | 'readonly' | 'fullsize' | 'disabled'
export type MetadataDialog = {
    isEdit?: boolean
    elementName?: string
    elementType?: string
    formValidator?: ValidatorFn | ValidatorFn[] | undefined | null
    // shared in between dialog and confirmation dialog
    buttons?: DialogButtonDef[]
    // for confirmation dialog
    title?: string
    message?: string
    superType?: string
    nameKey?: string
    action?: string
    index?: number
}
export type AcceptedTypes = (InternalAcceptedTypes | InputType)
type IsUnion<T, U extends T = T> =
  T extends unknown ? ([U] extends [T] ? false : true) : false
type KeysOfInputType<T, U> = keyof { [K in keyof T as T[K] extends U ? K extends string ? K : never : never]: K }
export type ValidAcceptedTypes<T extends readonly AcceptedTypes[]> = KeysOfInputType<T, InputType> extends never ? T : IsUnion<KeysOfInputType<T, InputType>> extends true ? [never, "More than 1 InputType added"] : T
export function assertValidAcceptedTypes<T extends readonly AcceptedTypes[]>(t: ValidAcceptedTypes<[...T]>) { return t }

export type DataDialogDef = {
    types?: AcceptedTypes[]
    value?: string | number | (string | number)[] | undefined | null
    validators?: ValidatorFn | ValidatorFn[] | undefined | null
    inputError?: string | undefined | null
    inputPlaceholders?: string | undefined | null
    inputLabel?: string | undefined | null
    inputHelpBlock?: string | undefined | null
}
export type DataDialogMap = Map<'metadata', MetadataDialog> & Map<'dataInputs', string []> & Map<string, DataDialogDef>
/* END OF Strong typing helpers for Data Dialog Inputs */

/* Data structure helper builder for Dialog Component */
export const buildDataMap = (dataSource, index, formDefinition, title, type) => {
    const data = dataSource?.[index]
    const metadata: MetadataDialog = {
      isEdit: !!data,
      elementName: title,
      elementType: type,
      ...(formDefinition.formValidator && { formValidator: formDefinition.formValidator }),
      ...(formDefinition.buttonList && formDefinition.buttonMetaData && { buttons: formDefinition.buttonList.map(buttonName => formDefinition.buttonMetaData.get(buttonName)) }),
      ...(formDefinition.title && { title: formDefinition.title })
    }
    const result: DataDialogMap = (new Map()).set('dataInputs', formDefinition.dataInputs).set('metadata', metadata)
    for (const inputName of formDefinition.dataInputs) {
      const types = formDefinition?.dataDefaultInputTypes?.get(inputName)
      result.set(inputName, {
        value: data?.[inputName] ?? formDefinition.dataDefaultInputValues?.get(inputName),
        types: types ? (Array.isArray(types) ? types : [types]) : null,
        validators: formDefinition?.dataInputValidators?.get(inputName),
        inputError: formDefinition?.dataInputErrors?.get(inputName),
        inputPlaceholders: formDefinition?.dataInputPlaceholders?.get(inputName),
        inputLabel: formDefinition?.dataInputLabels?.get(inputName),
        inputHelpBlock: formDefinition?.dataInputHelpBlocks?.get(inputName),
      })
    }
    return result
}
/* END OF Data structure helper builder for Dialog Component */

/* Button metadata type definition */
export type DialogButtonDef = {
  action: 'close' | 'submit'
  text: string
  position?: string
  class?: string
}
/* Button metadata type definition */