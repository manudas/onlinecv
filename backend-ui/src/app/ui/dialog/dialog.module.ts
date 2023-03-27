import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatDatepickerModule } from '@angular/material/datepicker'
// import { MatNativeDateModule } from '@angular/material/core'

import { ConfirmModule } from '@app/ui/confirm/confirm.module'
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
        ConfirmModule,
        CommonModule,
        FontAwesomeModule,
        MatDatepickerModule,
//         MatNativeDateModule,
        MatIconModule,
        ReactiveFormsModule,
        TableCardModule,
        TranslationServiceModule,
    ],
    exports: [DialogComponent]
})
export class DialogModule {}
