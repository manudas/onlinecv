import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { EditSocialNetworkStructure, SocialNetwork } from "@app/types/SocialNetworks";

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

    editingIndex: number = null

    constructor( public dialogRef: MatDialogRef<SocialNetworkDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: EditSocialNetworkStructure) {
        if (data) {
            const {
                index,
                network
            } = data

            this.editingIndex = index

            for (const control in this.socialNetworksFormGroup.controls) {
                this.socialNetworksFormGroup.get(control).setValue(network[control])
            }
        }
    }

    submitHandler($event): void {
        if (this.socialNetworksFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
            const network = this.socialNetworksFormGroup.value
            let result
            if (this.editingIndex !== null) {
                result = {
                    index: this.editingIndex,
                    network
                }
            } else {
                result = network
            }
            this.close(result);
        } else {
          //this.detailsFormGroup.markAllAsTouched()
          this.socialNetworksFormGroup.markAllAsTouched()
        }
      }


    close(message: SocialNetwork | EditSocialNetworkStructure = null) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */
        this.dialogRef.close(message);
    }
}
