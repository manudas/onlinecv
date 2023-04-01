import { DateAdapter } from '@angular/material/core'
import { select, Store } from '@ngrx/store'
import { Component, Inject } from "@angular/core"
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { LocaleStore } from '@app/types'
import { Observable } from 'rxjs'
import { logEasy } from '@app/services/logging'

type StoreType = { locale: LocaleStore }
export type AcceptedTypes = 'hidden' | 'readonly' | 'date' | 'readonly' | 'fullsize' | 'number' | undefined | null
export type MetadataDialog = {
    isEdit?: boolean
    elementName?: string
    elementType?: string
    formValidator?: ValidatorFn | ValidatorFn[] | undefined | null
}
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

@Component({
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    dataFormGroup: FormGroup            = new FormGroup({ })
    types: Map<string, string[]>        = new Map<string, string[]>()
    errors: Map<string, string>         = new Map<string, string>()
    placeholders: Map<string, string>   = new Map<string, string>()
    labels: Map<string, string>         = new Map<string, string>()
    helpBlock: Map<string, string>      = new Map<string, string>()
    isEdit: boolean                     = false
    elementName: string
    elementType: string

    selectedLocale$: Observable<string>
    isFormArray = (form: AbstractControl): form is FormArray => 'controls' in form && Array.isArray((form as FormArray).controls)
    addControl(control, value, validators) {
        if (Array.isArray(value)) {
            this.dataFormGroup.addControl(control, new FormArray([]));
            (value.length > 0 ? value : [null]).forEach((singleValue, index) => (this.dataFormGroup.controls[control] as FormArray).controls.push(new FormControl(singleValue, validators?.[index] ?? validators )))
        } else {
            this.dataFormGroup.addControl(control, new FormControl(value, validators))
        }
    }
    addArrayControl = (control: FormArray) => control.push(new FormControl())
    addType = (control: string, typesParam: AcceptedTypes | AcceptedTypes[]) => this.types.set(control, Array.isArray(typesParam) ? typesParam : [typesParam])
    addError = (control: string, error: string) => this.errors.set(control, error )
    addPlaceholder = (control: string, placeholder: string) => this.placeholders.set(control, placeholder)
    addLabel = (control: string, label: string) => this.labels.set(control, label)
    addHelpBlock = (control: string, helpBlock: string) => this.helpBlock.set(control, helpBlock)
    close = (message: unknown = null) => this.dialogRef.close(message)
    debug = (message: any) => logEasy(message)

    constructor( public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public dataMap: DataDialogMap, private dateAdapter: DateAdapter<any>, private store: Store<StoreType> ) {
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.selectedLocale$.subscribe((data: string) => data && this.dateAdapter.setLocale(data))
        for (let control of dataMap.get('dataInputs') as Array<string>) {
            const val = dataMap.get(control)
            if (typeof val === "undefined" || control === "metadata") continue;
            const { types, value, validators, inputError, inputPlaceholders, inputLabel, inputHelpBlock } = val as DataDialogDef
            types?.includes('date') ? this.addControl(control, value ? new Date(Number(value)) : null, validators) : this.addControl(control, value, validators)
            types && this.addType(control, types)
            inputError && this.addError(control, inputError)
            inputPlaceholders && this.addPlaceholder(control, inputPlaceholders)
            inputLabel && this.addLabel(control, inputLabel)
            inputHelpBlock && this.addHelpBlock(control, inputHelpBlock)
        }
        const meta = dataMap.get('metadata') as MetadataDialog
        if(meta?.formValidator) this.dataFormGroup.addValidators(meta.formValidator)
        this.isEdit = meta?.isEdit ?? false
        this.elementName = meta?.elementName ?? null
        this.elementType = meta?.elementType ?? null
    }

    submitHandler(_$event): void {
        Object.values(this.dataFormGroup.controls).forEach(control => this.isFormArray(control) && control.updateValueAndValidity())
        this.dataFormGroup.updateValueAndValidity()
        if (this.dataFormGroup.valid) {
            this.close(this.dataFormGroup.value)
        } else {
          this.dataFormGroup.markAllAsTouched()
        }
    }

    deleteArrayControl(control: FormArray, index: number) {
        control.removeAt(index)
        if (control.length === 0) control.push(new FormControl())
    }
}