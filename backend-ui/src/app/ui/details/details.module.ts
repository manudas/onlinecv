import {
    NgModule
} from '@angular/core'
import {
    CommonModule
} from '@angular/common'
import {
    DragDropModule
} from '@angular/cdk/drag-drop'

import {
    MatTableModule
} from "@angular/material/table"

import {
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome'
import {
    NgbModule
} from '@ng-bootstrap/ng-bootstrap'

import {
    /*FormsModule,*/
    ReactiveFormsModule
} from '@angular/forms'

import {
    CardModule
} from '@app/ui/card/card.module'
import {
    FileuploadModule
} from '@app/ui/file-upload/file-upload.module'
import {
    TranslationServiceModule
} from '@services/translation'

import {
    DetailsComponent
} from './details.component'

import {
    DataService
} from '@services/data/data.service'
import {
    SocialNetworkDialogComponent
} from './social-network-dialog.component'
import {
    ConfirmModule
} from '@app/ui/confirm/confirm.module'
import {
    UnderscoreModule
} from '@app/services/underscore'

@NgModule({
    declarations: [
        DetailsComponent,
        SocialNetworkDialogComponent,
    ],
    imports: [
        ConfirmModule,
        CommonModule,
        DragDropModule,
        FontAwesomeModule,
        NgbModule,
        CardModule,
        FileuploadModule,
        MatTableModule,
        ReactiveFormsModule,
        TranslationServiceModule,
        UnderscoreModule,
    ],
    exports: [DetailsComponent],
    providers: [DataService]
})
export class DetailsModule {}