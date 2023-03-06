import { Component, Inject } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { LanguageInterface } from "@app/types/Languages";
import { EditLanguageStructure } from "@app/types/Languages"

import { assessmentFromOneToTen } from '@utils/commonFormValidators'

@Component({
    templateUrl: './language-skills-dialog.component.html',
    styleUrls: ['./language-skills-dialog.component.scss'] // let's share the css with skills-dialog
})
export class LanguageDialogComponent {

    languageFormGroup: FormGroup = new FormGroup({

        id: new FormControl(null),
        name: new FormControl(null, Validators.required),
        certification: new FormControl(null),
        school: new FormControl(null),
        school_url: new FormControl(null),
        written_level: new FormControl(null, assessmentFromOneToTen),
        spoken_level: new FormControl(null, assessmentFromOneToTen),
    })

    editingIndex: number = null

    constructor( public dialogRef: MatDialogRef<LanguageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data?: EditLanguageStructure) {
        if (data) { // is EditLanguageStructure type
            const { index, language } = data

            this.editingIndex = index

            for (const control in this.languageFormGroup.controls) {
                this.languageFormGroup.get(control).setValue(language[control])
            }
        } else { /* is new Language */ }
    }

    submitHandler(_$event): void {
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
