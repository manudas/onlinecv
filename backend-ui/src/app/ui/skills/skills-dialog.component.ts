import { Component, Inject } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import {
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
    EditSkillsStructure,
    SkillInterface,
    SkillsType
} from '@app/types/Skills';

import { assessmentFromOneToTen } from '@utils/commonFormValidators'
@Component({
    templateUrl: './skills-dialog.component.html',
    styleUrls: ['./skills-dialog.component.scss']
})
export class SkillsDialogComponent {
    skillsFormGroup: FormGroup = new FormGroup({
        id: new FormControl(null),

        tag: new FormControl(null, Validators.required),
        description: new FormControl(null),
        skill_level: new FormControl(null, assessmentFromOneToTen),
        type: new FormControl(null), // computer? others?

        // no estoy seguro de que la mejor forma de manejar keywords sea con un FormControl
        keywords: new FormControl(null)
    });

    editingIndex: number = null;

    constructor(
        public dialogRef: MatDialogRef<SkillsDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: EditSkillsStructure | string
    ) {
        if (
            !(
                typeof data === 'string' ||
                data instanceof String
            )
        ) {
            // is EditTrainingStructure type
            const { index, skill } = data;

            this.editingIndex = index;

            for (const control in this.skillsFormGroup
                .controls) {
                this.skillsFormGroup.get(control).setValue(skill[control]);
            }
        } else {
            // is TrainingType enum
            this.skillsFormGroup.get('type').setValue(data);
        }
    }

    submitHandler(_$event): void {
        if ( this.skillsFormGroup.valid ) {
            const skill = this.skillsFormGroup.value;
            let result;
            if (this.editingIndex !== null) {
                result = { index: this.editingIndex, skill }
            } else {
                result = skill
            }
            this.close(result)
        } else {
            this.skillsFormGroup.markAllAsTouched();
        }
    }

    close(
        message: SkillInterface | EditSkillsStructure = null
    ) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }

    get TrainingType() {
        return SkillsType;
    }
}
