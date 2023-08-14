import { DateAdapter } from '@angular/material/core'
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { select, Store } from '@ngrx/store'
import { Component, Inject } from "@angular/core"
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LocaleStore } from '@app/types'
import * as FILE_UTILS from '@app/utils/Files'
import { Observable } from 'rxjs'
import { logEasy } from '@app/services/logging'
import { AcceptedTypes, DataDialogDef, DataDialogMap, DialogButtonDef, InputType, InputTypeArr, MetadataDialog } from './helpers'



import { dataType } from '@app/ui/file-upload/file-upload.component'


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
    index: number                       = null
    isEdit: boolean                     = false
    elementName: string
    elementType: string
    buttons: DialogButtonDef[]
    title: string
    selectedLocale$: Observable<string>
    isFormArray = (form: AbstractControl): form is FormArray => 'controls' in form && Array.isArray((form as FormArray).controls)
    addControl(control, value, validators) {
        if (Array.isArray(value)) {
            this.dataFormGroup.addControl(control, new FormArray([], validators));
            (value.length > 0 ? value : []).forEach(singleValue => (this.dataFormGroup.controls[control] as FormArray).controls.push(new FormControl(singleValue)))
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
    // Type text: either no type at all, or type text or anytype that is not included in InputTypeArr
    isTextInput = (types: Array<InputType>) => !types || types.includes('text') || !types.some(e => InputTypeArr.includes(e))
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
              this.addControl(control, (types?.includes('array') || types?.includes('taglist') || types?.includes('carousel')) && !Array.isArray(value) ? (value ? [value] : [] ) : value, validators)
              if (types?.includes('carousel')) {
                (this.dataFormGroup.get(control) as FormArray).controls.forEach(({value}) => this.buildImageCache(control, value))
              }
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
        this.index = meta?.index ?? null
        this.isEdit = meta?.isEdit ?? false
        this.elementName = meta?.elementName ?? null
        this.elementType = meta?.elementType ?? null
        this.buttons = meta?.buttons ?? null
        this.title = meta?.title ?? null
    }
    checkErrors = (errors, control) => errors && control.touched && control.errors

    submitHandler(_$event): void {
        Object.values(this.dataFormGroup.controls).forEach(control => this.isFormArray(control) && control.updateValueAndValidity())
        this.dataFormGroup.updateValueAndValidity()
        if (this.dataFormGroup.valid) {
            this.close(!this.isEdit ? this.dataFormGroup.value : {index: this.index, [this.elementName.toLowerCase()] : this.dataFormGroup.value})
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

    /* Carousel supporting methods */
    acceptedDocumentFileType                                            = FILE_UTILS.definedFileTypes.image
    addImageToCarouselCacheFunc: Record<string, (arg: string) => void>  = {}
    imageToCarouselCache: Record<string, Array<{thumbImage: string}>> = {}
    addImageToCarouselFunc = (control: FormArray, name: string) => {
        if (!this.addImageToCarouselCacheFunc[name]) {
            this.addImageToCarouselCacheFunc[name] = (value: dataType | { data: dataType, metadata: unknown }) => {
                                                   //(value: dataType | { data: dataType, metadata: unknown }) => {
                const metadata: unknown = value && typeof value === 'object' && 'metadata' in value ? value.metadata : undefined
                /*
                    value is:
                    1 - object with data (picture)
                    2 - object with data.data(picture)

                    therefore value will always be an object
                */
                const pictureObj: string | dataType = value && typeof value === 'object' && 'data' in value ? value.data : undefined
                const picture = pictureObj && typeof pictureObj === 'object' && 'data' in pictureObj ? pictureObj.data : pictureObj
                const dataObj = metadata == null ? value : pictureObj
                if (picture) {
                    if (metadata != null) { // metadata is an index
                        control.at(metadata as number).patchValue(dataObj)
                    } else {
                        control.push(new FormControl(dataObj))
                        this.buildImageCache(name, picture)
                    }
                }
            }
        }
        return this.addImageToCarouselCacheFunc[name]
    }
    buildImageCache = (name, value) => {
        this.imageToCarouselCache[name] = [...this.imageToCarouselCache[name] ?? [], {
            thumbImage: FILE_UTILS.attachUrlDataTypeToBase64(value.data),
        }]
    }
    selectedImage: Record<string, number>  = {}
    loadCarouselImage = (name: string) => (carouselIndex: number) => {
        this.selectedImage[name] = carouselIndex
        return this.selectedImage[name]
    }
    deselectCarouselImage = (name: string) => (_carouselIndex: number) => {
        delete this.selectedImage[name]
    }
    deleteCarouselImage = (control: FormArray, name: string) => (carouselIndex: number) => {
        control.removeAt(carouselIndex)
        this.imageToCarouselCache[name] = [...this.imageToCarouselCache[name].slice(0, carouselIndex), ...this.imageToCarouselCache[name].slice(carouselIndex + 1)]
        this.deselectCarouselImage(name)(undefined)
    }
    getSelectedImage = (control:FormArray, name: string) => {
        if (this.selectedImage[name] != null) {
            return {
                data: control.value[this.selectedImage[name]],
                metadata: this.selectedImage[name]
            }
        }
        return undefined
    }
    setCarouselControlTouched = (control: FormArray) => control.markAsTouched()
    /* END of Carousel support methods */
}