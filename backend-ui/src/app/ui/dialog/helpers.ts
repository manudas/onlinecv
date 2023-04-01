import { DataDialogMap, MetadataDialog } from "./dialog.component"

export const buildDataMap = (dataSource, index, formDefinition, title, type) => {
    const data = dataSource?.[index]
    const metadata: MetadataDialog = { isEdit: !!data, elementName: title, elementType: type, ...(formDefinition.formValidator && { formValidator: formDefinition.formValidator }) }
    const result: DataDialogMap = (new Map()).set('dataInputs', formDefinition.dataInputs).set('metadata', metadata)
    for (const inputName of formDefinition.dataInputs) {
      const types = formDefinition.dataDefaultInputTypes.get(inputName)
      result.set(inputName, {
        value: data?.[inputName] ?? formDefinition.dataDefaultInputValues.get(inputName),
        types: types ? (Array.isArray(types) ? types : [types]) : null,
        validators: formDefinition.dataInputValidators.get(inputName),
        inputError: formDefinition.dataInputErrors.get(inputName),
        inputPlaceholders: formDefinition.dataInputPlaceholders.get(inputName),
        inputLabel: formDefinition.dataInputLabels.get(inputName),
        inputHelpBlock: formDefinition.dataInputHelpBlocks.get(inputName),
      })
    }
    return result
}