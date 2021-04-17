import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { EditExperienceStructure, ExperienceInterface, ExperienceType } from "@app/types/Experience";

@Component({
    templateUrl: './experience-dialog.component.html',
    styleUrls: ['./experience-dialog.component.scss']
})
export class ExperienceDialogComponent {

    /*
     * GraphQL Schema:

        type WorkExperience {
            id: ID!
            description: String,
            type: String!,
            start_date: String,
            finish_date: String,
            role: String!,
            company: String,
            company_url: String,
            keywords: [String]!,
            language: String!,
            order: Int!
        }

     */

    experienceFormGroup: FormGroup = new FormGroup({
        id: new FormControl(null),
        role: new FormControl(null, Validators.required),
        description: new FormControl(null),
        type: new FormControl(null, Validators.required),
        start_date: new FormControl(null),
        finish_date: new FormControl(null),
        company: new FormControl(null),
        company_url: new FormControl(null),
        keywords: new FormControl(null),
    })

    editingIndex: number = null

    constructor( public dialogRef: MatDialogRef<ExperienceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditExperienceStructure | string) {
        if (!(typeof data === 'string' || data instanceof String)) { // is EditTrainingStructure type
            const {
                index,
                experience
            } = data

            this.editingIndex = index

            for (const control in this.experienceFormGroup.controls) {
                this.experienceFormGroup.get(control).setValue(experience[control])
            }
        } else { // is TrainingType enum
            this.experienceFormGroup.get('type').setValue(data)
        }
    }

    submitHandler($event): void {
        if (this.experienceFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            const training = this.experienceFormGroup.value
            let result
            if (this.editingIndex !== null) {
                result = {
                    index: this.editingIndex,
                    training
                }
            } else {
                result = training
            }
            this.close(result);
        } else {
          //this.detailsFormGroup.markAllAsTouched()
          this.experienceFormGroup.markAllAsTouched()
        }
      }


    close(message: ExperienceInterface | EditExperienceStructure = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }

    get ExperienceType() {
        return ExperienceType
    }
}
