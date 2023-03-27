import { DataDialogMap, MetadataDialog } from "./dialog.component"

export const buildDataMap = (dataSource, index, fromDefinition, title, type) => {
    const data = dataSource?.[index]
    const metadata: MetadataDialog = { isEdit: !!data, elementName: title, elementType: type }
    const result: DataDialogMap = (new Map()).set('dataInputs', fromDefinition.dataInputs).set('metadata', metadata)
    for (const inputName of fromDefinition.dataInputs) {
      const types = fromDefinition.dataDefaultInputTypes.get(inputName)
      result.set(inputName, {
        value: data?.[inputName] ?? fromDefinition.dataDefaultInputValues.get(inputName),
        types: types ? (Array.isArray(types) ? types : [types]) : null,
        validators: fromDefinition.dataInputValidators.get(inputName),
        inputError: fromDefinition.dataInputErrors.get(inputName),
        inputPlaceholders: fromDefinition.dataInputPlaceholders.get(inputName),
        inputLabel: fromDefinition.dataInputLabels.get(inputName),
        inputHelpBlock: fromDefinition.dataInputHelpBlocks.get(inputName),
      })
    }
    return result
}