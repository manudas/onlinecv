import { Component, Inject } from "@angular/core";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { FileOptions } from "@app/types/File";

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    allowDeselection: boolean
    allowChange: boolean

    get FileOptions(): typeof FileOptions {
        return FileOptions
    }

    // we are not planning to pass data down to the constructor for now in this confirmation component
    constructor( public dialogRef: MatDialogRef<ConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: {
        allowDeselection: boolean, allowChange: boolean
    }) {
        this.allowDeselection = data?.allowDeselection ?? false
        this.allowChange = data?.allowChange ?? false
    }

    close(message: FileOptions) {
        /*
         * this is to send the message to the caller
         */
        this.dialogRef.close(message)
    }
}
