import { Component, Inject } from "@angular/core";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { ExperienceInterface } from "@app/types/Experience";

type data = {
    index: number
    experience: ExperienceInterface
}

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    experience: ExperienceInterface
    index: number

    constructor( public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: data) {

        const {
            index,
            experience
        } = data

        this.index = index
        this.experience = experience
    }

    close(index?: number, type?: string) {
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
