import {
    Component,
    Inject
} from "@angular/core";
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { DataDialogMap, DialogButtonDef, MetadataDialog } from "@ui/dialog/helpers"

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

    title: string
    message: string
    buttons: DialogButtonDef[]
    action: string // what is the action to be applied?
    element: any // object to apply the action to
    index: number // index to the element in the array of elements in the parent component, if applicable
    superType: string // what is going to be affected by this?
    nameKey: string // key in object with the name representing this element

    acctionMap = {
        'delete': 'deleted'
    }

    constructor(public dialogRef: MatDialogRef < ConfirmComponent > , @Inject(MAT_DIALOG_DATA) public dataMap: DataDialogMap) {
        this.element = dataMap.get('element')
        const meta = dataMap.get('metadata') as MetadataDialog

        this.buttons = meta?.buttons ?? null
        this.title = meta?.title ?? null
        this.message = meta?.message
        this.superType = meta?.superType
        this.nameKey = meta?.nameKey
        this.action = meta?.action
        this.index = meta?.index
    }

    close(index ? : number, element ? : any) {
        /*
         * this is to send the message to the caller
         */
        this.dialogRef.close({
            ...(index != null && { index }),
            ...(element && { element })
        });
    }
}