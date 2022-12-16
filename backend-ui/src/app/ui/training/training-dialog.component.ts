import { DateAdapter } from '@angular/material/core';
import { select, Store } from '@ngrx/store'

import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatLegacyDialogRef as MatDialogRef,
    MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from "@angular/material/legacy-dialog"
import { EditTrainingStructure, TrainingInterface, TrainingType } from "@app/types/Training";
import { Observable } from "rxjs";
import { LocaleStore } from '@app/types';

type StoreType = { locale: LocaleStore }

@Component({
    templateUrl: './training-dialog.component.html',
    styleUrls: ['./training-dialog.component.scss']
})
export class TrainingDialogComponent {

    /*
     * GraphQL Schema:

        type Training {
            id: ID!
            tag: String!,
            description: String,
            type: String,
            school: String,
            start_date: String,
            finish_date: String,
            final_project: String,
            school_url: String,
            average_grade: Float,
            keywords: [String]!,
            language: String!
        }

     */

    trainingFormGroup: FormGroup = new FormGroup({
        id: new FormControl(null),
        tag: new FormControl(null, Validators.required),
        description: new FormControl(null),
        type: new FormControl(null, Validators.required),
        school: new FormControl(null),
        start_date: new FormControl(null),
        finish_date: new FormControl(null),
        final_project: new FormControl(null),
        school_url: new FormControl(null),
        average_grade: new FormControl(null),



        // no estoy seguro de que la mejor forma de manejar keywords sea con un FormControl
        keywords: new FormControl(null),
    })

    editingIndex: number = null

    selectedLocale$: Observable<string>

    constructor( public dialogRef: MatDialogRef<TrainingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditTrainingStructure | string, private dateAdapter: DateAdapter<any>, private store: Store<StoreType>) {

        this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
        this.selectedLocale$.subscribe((data: string) => data && this.dateAdapter.setLocale(data))

        if (!(typeof data === 'string' || data instanceof String)) { // is EditTrainingStructure type
            const {
                index,
                training
            } = data

            this.editingIndex = index

            for (const control in this.trainingFormGroup.controls) {
                if (control.includes('date')) {
                    this.trainingFormGroup.get(control).setValue(new Date(Number(training[control])))
                }
                else {
                    this.trainingFormGroup.get(control).setValue(training[control])
                }
            }
        } else { // is TrainingType enum
            this.trainingFormGroup.get('type').setValue(data)
        }
    }

    submitHandler($event): void {
        if (this.trainingFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            const training = this.trainingFormGroup.value
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
          this.trainingFormGroup.markAllAsTouched()
        }
      }


    close(message: TrainingInterface | EditTrainingStructure = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }

    get TrainingType() {
        return TrainingType
    }
}
