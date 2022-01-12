


import { DateAdapter } from '@angular/material/core';
import { select, Store } from '@ngrx/store'









import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { EditExperienceStructure, ExperienceInterface, ExperienceType } from "@app/types/Experience";
import { LocaleStore } from '@app/types';
import { Observable } from 'rxjs';

type StoreType = { locale: LocaleStore }
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
    selectedLocale: string // iso code
    selectedLocale$: Observable<string>

    constructor( public dialogRef: MatDialogRef<ExperienceDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditExperienceStructure | string, private dateAdapter: DateAdapter<any>, private store: Store<StoreType>) {

        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.selectedLocale$.subscribe((data: string) => data && this.dateAdapter.setLocale(data))

        if (!(typeof data === 'string' || data instanceof String)) { // is EditTrainingStructure type
            const {
                index,
                experience
            } = data

            this.editingIndex = index

            for (const control in this.experienceFormGroup.controls) {
                if (control.includes('date')) {
                    this.experienceFormGroup.get(control).setValue(new Date(Number(experience[control])))
                }
                else {
                    this.experienceFormGroup.get(control).setValue(experience[control])
                }
            }
        } else { // is TrainingType enum
            this.experienceFormGroup.get('type').setValue(data)
        }
    }

    submitHandler($event): void {
        if (this.experienceFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            const experience = this.experienceFormGroup.value
            let result
            if (this.editingIndex !== null) {
                result = {
                    index: this.editingIndex,
                    experience
                }
            } else {
                result = experience
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
