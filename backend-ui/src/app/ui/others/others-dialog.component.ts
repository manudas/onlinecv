import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { ReferenceDef, EditReferenceStructure } from "@app/types/References";
import { LocaleStore } from '@app/types';

type StoreType = { locale: LocaleStore }
@Component({
    templateUrl: './others-dialog.component.html',
    styleUrls: ['./others-dialog.component.scss']
})
export class OthersDialogComponent {

    dataFormGroup: FormGroup = new FormGroup({
        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        role: new FormControl(null),
        description: new FormControl(null),
        company: new FormControl(null),
        company_url: new FormControl(null),
        keywords: new FormControl(null),
        phone: new FormControl('', this.validatorEmailOrPhone.bind(this)),
        email: new FormControl('', this.validatorEmailOrPhone.bind(this)),
    })

    editingIndex: number = null

    constructor( public dialogRef: MatDialogRef<OthersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditReferenceStructure) {
        const {
            index,
            reference
        } = data

        this.editingIndex = index

        for (const control in this.dataFormGroup.controls) {
            if (control.includes('date')) {
                this.dataFormGroup.get(control).setValue(new Date(Number(reference[control])))
            }
        }
    }

    submitHandler($event): void {
        if (this.dataFormGroup.valid) {
            const data = this.dataFormGroup.value

            let result
            if (this.editingIndex !== null) {
                result = {
                    index: this.editingIndex,
                    data
                }
            } else {
                result = data
            }
            this.close(result);
        } else {
          this.dataFormGroup.markAllAsTouched()
        }
      }


    close(message: ReferenceDef | EditReferenceStructure = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }


    validatorEmailOrPhone(_): ValidationErrors | null {
        // no email and no phone, not allowed
        const emailOrPhone = !this.dataFormGroup?.get('email').value.trim() && !this.dataFormGroup?.get('phone').value.trim()
        if (emailOrPhone) { // is not valid, set both as erroneus
            this.dataFormGroup?.get('email').setErrors({ emailOrPhone: { value: true } })
            this.dataFormGroup?.get('phone').setErrors({ emailOrPhone: { value: true } })
        } else {
            this.dataFormGroup?.get('email').setErrors(null)
            this.dataFormGroup?.get('phone').setErrors(null)
        }

        return emailOrPhone
            ? { emailOrPhone: { value: true } }
            : null
    }
}
