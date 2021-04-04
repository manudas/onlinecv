import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog"
import { SocialNetwork } from "@app/types/SocialNetworks";

@Component({
    templateUrl: './social-network-dialog.component.html',
    styleUrls: ['./social-network-dialog.component.scss']
})
export class SocialNetworkDialogComponent {

    /*
     * GraphQL Schema:

        type SocialNetwork {
            id: ID!
            language: String!,
            label: String!,
            description: String,
            url: String!,
            keywords: [String]!,
            order: Int!
        }

     */
    socialNetworksFormGroup: FormGroup = new FormGroup({
        id: new FormControl(null), // new FormControl(initialValue, validators)
        label: new FormControl(null, Validators.required),
        description: new FormControl(null),
        url: new FormControl(null, Validators.required),
    })

    constructor( public dialogRef: MatDialogRef<SocialNetworkDialogComponent>) { }


    submitHandler($event): void {
        if (this.socialNetworksFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            this.close(this.socialNetworksFormGroup.value);
        } else {
          //this.detailsFormGroup.markAllAsTouched()
          this.socialNetworksFormGroup.markAllAsTouched()
        }
      }


    close(message: SocialNetwork = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }
}
