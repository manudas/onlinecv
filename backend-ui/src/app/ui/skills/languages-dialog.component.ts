import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatLegacyDialogRef as MatDialogRef,
    MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from "@angular/material/legacy-dialog"
import { LanguageInterface } from "@app/types/Languages";
import { EditLanguageStructure } from "@app/types/Languages";

import { assessmentFromOneToTen } from '@utils/commonFormValidators'

@Component({
    templateUrl: './languages-dialog.component.html',
    styleUrls: ['./skills-dialog.component.scss'] // let's share the css with skills-dialog
})
export class LanguageDialogComponent {

    /*
     * GraphQL Schema:

        type Language {
            _id: ID!
            name: String!,
            certification: String,
            school: String,
            school_url: String,
            written_level: Int,
            spoken_level: Int,
            keywords: [String]!,
            language: String!,
            order: Int!
        }

     */

    languageFormGroup: FormGroup = new FormGroup({

        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        certification: new FormControl(null),
        school: new FormControl(null),
        school_url: new FormControl(null),
        written_level: new FormControl(null, assessmentFromOneToTen),
        spoken_level: new FormControl(null, assessmentFromOneToTen),
        // keywords: new FormControl(null),
        // language: String!,
        // order: Int!
    })

    editingIndex: number = null

    constructor( public dialogRef: MatDialogRef<LanguageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditLanguageStructure | string) {
        if (!(typeof data === 'string' || data instanceof String)) { // is EditLanguageStructure type
            const {
                index,
                language
            } = data

            this.editingIndex = index

            for (const control in this.languageFormGroup.controls) {
                this.languageFormGroup.get(control).setValue(language[control])
            }
        } else { // is new Language
            // passing type "language" as data, no need to do anything here
            // this.languageFormGroup.get('type').setValue(data)
        }
    }

    submitHandler($event): void {
        if (this.languageFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            const language = this.languageFormGroup.value
            let result
            if (this.editingIndex !== null) {
                result = {
                    index: this.editingIndex,
                    language
                }
            } else {
                result = language
            }
            this.close(result);
        } else {
          //this.detailsFormGroup.markAllAsTouched()
          this.languageFormGroup.markAllAsTouched()
        }
      }


    close(message: LanguageInterface | EditLanguageStructure = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }
}
