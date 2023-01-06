import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatTableModule } from '@angular/material/table'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { CardModule } from '@app/ui/card/card.module'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'

import { TranslationServiceModule } from '@services/translation'

import { OthersComponent } from './others.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { UnderscoreModule } from '@app/services/underscore'

import { OthersDialogComponent } from './others-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
    declarations: [
        OthersComponent,
        OthersDialogComponent
    ],
    imports: [
        CardModule,
        ConfirmModule,
        CommonModule,
        DragDropModule,
        FontAwesomeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        TranslationServiceModule,
        UnderscoreModule
    ],
    exports: [OthersComponent]
})
export class OthersModule {}
