import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { EditSkillsStructure, SkillInterface, SkillsType } from "@app/types/Skills";

@Component({
    templateUrl: './skills-dialog.component.html',
    styleUrls: ['./skills-dialog.component.scss']
})
export class SkillsDialogComponent {

    /*
     * GraphQL Schema:

        id: ID
        tag: String!,
        description: String,
        skill_level: Int,



        will this be used ?
        related_knowledge: [RelatedKnowledge],


        type: String,
        developed_projects: [String]!,
        keywords: [String]!,
        language: String!

     */

    skillsFormGroup: FormGroup = new FormGroup({
        id: new FormControl(null),

        tag: new FormControl(null, Validators.required),
        description: new FormControl(null),
        skill_level: new FormControl(null),

        // related_knowledge: [RelatedKnowledge],
        type: new FormControl(null), // computer? others?
        // developed_projects: [String],
        // keywords: [String]!,
        // language: String!

        // no estoy seguro de que la mejor forma de manejar keywords sea con un FormControl
        // keywords: new FormControl(null),
    })

    editingIndex: number = null

    constructor( public dialogRef: MatDialogRef<SkillsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditSkillsStructure | string) {
        if (!(typeof data === 'string' || data instanceof String)) { // is EditTrainingStructure type
            const {
                index,
                skill
            } = data

            this.editingIndex = index

            for (const control in this.skillsFormGroup.controls) {
                this.skillsFormGroup.get(control).setValue(skill[control])
            }
        } else { // is TrainingType enum
            this.skillsFormGroup.get('type').setValue(data)
        }
    }

    submitHandler($event): void {
        if (this.skillsFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            const skills = this.skillsFormGroup.value
            let result
            if (this.editingIndex !== null) {
                result = {
                    index: this.editingIndex,
                    skills
                }
            } else {
                result = skills
            }
            this.close(result);
        } else {
          //this.detailsFormGroup.markAllAsTouched()
          this.skillsFormGroup.markAllAsTouched()
        }
      }


    close(message: SkillInterface | EditSkillsStructure = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }

    get TrainingType() {
        return SkillsType
    }
}
