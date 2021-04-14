import { Component, Inject } from "@angular/core";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { TrainingInterface, TrainingType } from "@app/types/Training";

type data = {
    index: number
    training: TrainingInterface
}

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    training: TrainingInterface
    index: number

    constructor( public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: data) {

        const {
            index,
            training
        } = data

        this.index = index
        this.training = training
    }

    close(index?: number, type?: TrainingType) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(
            index !== null && type !== null
                ? {
                    indexToRemove: index,
                    type
                }
                : null
        );
    }
}
