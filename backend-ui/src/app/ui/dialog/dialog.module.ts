
import { CommonModule } from '@angular/common'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { FileuploadModule } from '@app/ui/file-upload/file-upload.module'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatNativeDateModule } from '@angular/material/core'
import { NgImageSliderModule } from 'ng-image-slider'
import { NgModule } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { TableCardModule } from '@app/ui/table-card/table-card.module'
import { TranslationServiceModule } from '@services/translation'

import { DialogComponent } from './dialog.component'

@NgModule({
    declarations: [
        DialogComponent
    ],
    imports: [
        CommonModule,
        ConfirmModule,
        FileuploadModule,
        FontAwesomeModule,
        MatChipsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatIconModule,
        NgImageSliderModule,
        ReactiveFormsModule,
        TableCardModule,
        TranslationServiceModule,
    ],
    exports: [DialogComponent]
})
export class DialogModule {}
