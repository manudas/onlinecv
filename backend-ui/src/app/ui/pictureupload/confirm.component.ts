import { Component, Inject } from "@angular/core";
import {
    MatLegacyDialogRef as MatDialogRef,
    MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
} from "@angular/material/legacy-dialog"
import { PictureOptions } from "@app/types/Picture";

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {


    get PictureOptions(): typeof PictureOptions {
        return PictureOptions
    }

    // we are not planning to pass data down to the constructor for now in this confirmation component
    constructor( public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: never) { }

    close(message: PictureOptions) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }
}
