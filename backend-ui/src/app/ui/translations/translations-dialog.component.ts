import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { EditTranslationStructure, TranslationInterface } from "@app/types/Translations";

@Component({
    templateUrl: './translations-dialog.component.html',
    styleUrls: ['./translations-dialog.component.scss']
})
export class TranslationsDialogComponent {

    /*
        GRAPHQL QUERY INCLUDES THE FOLLOWING:
        'id: _id',
        'language',
        'module',
        'tag',
        'text',
        'domain',
        'missing',
        'accessCounter',
        'lastTimeFetched'
    */

    dataFormGroup: FormGroup = new FormGroup({
        id: new FormControl(null),
        module: new FormControl(null),
        tag: new FormControl(null, Validators.required),
        text: new FormControl(null, Validators.required),
        domain: new FormControl(null),
    })

    editingIndex: number = null
    missing: boolean = null

    constructor( public dialogRef: MatDialogRef<TranslationsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditTranslationStructure /*| string*/) {
        if (!(typeof data === 'string' || data instanceof String)) { // is EditTrainingStructure type
            const {
                index,
                translation,
                isMissing
            } = data

            this.editingIndex = index
            this.missing = isMissing

            for (const control in this.dataFormGroup.controls) {
                this.dataFormGroup.get(control).setValue(translation[control])
            }
        }
        /*
        else { // is TrainingType enum
            this.experienceFormGroup.get('type').setValue(data)
        }
        */
    }

    submitHandler($event): void {
        if (this.dataFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            const translation = this.dataFormGroup.value
            let result
            if (this.editingIndex !== null) {
                result = {
                    index: this.editingIndex,
                    translation
                }
            } else {
                result = translation
            }
            this.close(result);
        } else {
          //this.detailsFormGroup.markAllAsTouched()
          this.dataFormGroup.markAllAsTouched()
        }
      }


    close(message: TranslationInterface | EditTranslationStructure = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }
}
