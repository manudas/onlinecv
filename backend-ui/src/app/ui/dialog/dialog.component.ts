import { DateAdapter } from '@angular/material/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { select, Store } from '@ngrx/store'
import { Component, Inject } from "@angular/core"
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LocaleStore } from '@app/types'
import { Observable } from 'rxjs'
import { logEasy } from '@app/services/logging'
import { AcceptedTypes, DataDialogDef, DataDialogMap, DialogButtonDef, MetadataDialog } from './helpers'

type StoreType = { locale: LocaleStore }
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
    buttons: DialogButtonDef[]
    title: string
    selectedLocale$: Observable<string>
    isFormArray = (form: AbstractControl): form is FormArray => 'controls' in form && Array.isArray((form as FormArray).controls)
    addControl(control, value, validators) {
        if (Array.isArray(value)) {
            this.dataFormGroup.addControl(control, new FormArray([]));
            (value.length > 0 ? value : []).forEach((singleValue, index) => (this.dataFormGroup.controls[control] as FormArray).controls.push(new FormControl(singleValue, validators?.[index] ?? validators )))
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
    getControlsOfFormArrayOrEmptyControl = (control: FormArray) => { !control.length && this.addArrayControl(control); return control.controls }
    constructor( public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public dataMap: DataDialogMap, private dateAdapter: DateAdapter<any>, private store: Store<StoreType> ) {
        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.selectedLocale$.subscribe((data: string) => data && this.dateAdapter.setLocale(data))
        for (let control of dataMap.get('dataInputs') as Array<string>) {
            const val = dataMap.get(control)
            if (typeof val === "undefined" || control === "metadata") continue;
            const { types, value, validators, inputError, inputPlaceholders, inputLabel, inputHelpBlock } = val as DataDialogDef
            if (types?.includes('date')) {
              this.addControl(control, value ? new Date(Number(value)) : null, validators)
            } else {
              // if its taglist or array and the provided value exist but is not an array, put it in an array before passing it down
              this.addControl(control, (types?.includes('array') || types?.includes('taglist')) && !Array.isArray(value) ? (value ? [value] : [] ) : value, validators)
            }
            types?.includes('disabled') && this.dataFormGroup.controls[control].disable()
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
        this.buttons = meta?.buttons ?? null
        this.title = meta?.title ?? null
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

    /* Elements for chip/tag list input */
    addTagToTagListOnBlur = true
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    addTagToTagList(control: FormArray, event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our new string
        if (value) {
          // control.push(value);
          control.push(new FormControl(value))
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removeTagFromTagList(control: FormArray, previousValue: string): void {
        const index = control.value.indexOf(previousValue);

        if (index >= 0) {
          control.removeAt(index);
        }
    }

    editTagFromTagList(control: FormArray, previousValue: string, event: MatChipEditedEvent) {
      const value = event.value.trim();

      // Remove string if it no longer has a lenght
      if (!value) {
          this.removeTagFromTagList(control, previousValue);
          return;
      }

      // Edit existing value
      const index = control.value.indexOf(previousValue);
      if (index >= 0) {
          control.at(index).setValue(value)
      }
    }
    /* END of elements for chip/tag list input */
}