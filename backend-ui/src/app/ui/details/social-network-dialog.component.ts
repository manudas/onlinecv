import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog"

@Component({
    templateUrl: './social-network-dialog.component.html',
    styleUrls: ['./social-network-dialog.component.scss']
})
export class SocialNetworkDialogComponent {

    socialNetworksFormGroup: FormGroup = new FormGroup({})

    constructor( public dialogRef: MatDialogRef<SocialNetworkDialogComponent>) { }

    close() {
        console.log('o el afterclosed o el close, no creo que ambos hagan falta')
        this.dialogRef.afterClosed().subscribe(value => {
            console.log(`Dialog sent: ${value}`);
        });
        this.dialogRef.close("Thanks for using me!");
    }
}
