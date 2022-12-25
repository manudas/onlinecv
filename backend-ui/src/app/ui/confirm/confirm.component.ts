import {
    Component,
    Inject
} from "@angular/core";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"

type data = {
    action: string
    index: number
    element: any
    nameKey: string
    superType: string
}

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    action: string // what is the action to be applied?
    element: any // object to apply the action to
    index: number // index to the element in the array of elements in the parent component, if applicable
    superType: string // what is going to be affected by this?
    nameKey: string // key in object with the name representing this element

    acctionMap = {
        'delete': 'deleted'
    }

    constructor(public dialogRef: MatDialogRef < ConfirmComponent > , @Inject(MAT_DIALOG_DATA) public data: data) {

        const {
            action,
            index,
            element = null,
            nameKey,
            superType,
        } = data

        this.action = action
        this.index = index
        this.element = element
        this.superType = superType
        this.nameKey = nameKey
    }

    close(index ? : number, element ? : any) {
        /*
         * this is to get the message in the caller:

            this.dialogRef.afterClosed().subscribe(value => {
                console.log(`Dialog sent: ${value}`);
            });

        */

        this.dialogRef.close({
            ...(index != null && { // != null -> neither null nor undefined
                index
            }),
            ...(element && {
                element
            })
        });
    }
}