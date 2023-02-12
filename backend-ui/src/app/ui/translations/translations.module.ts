import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from "@angular/material/table"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { CardModule } from '@app/ui/card/card.module'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { SpecialCharsModule } from '@app/services/specialChars'
import { TranslationServiceModule } from '@services/translation'
import { TranslationComponent } from './translations.component'
import { TranslationsDialogComponent } from './translations-dialog.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        TranslationComponent,
        TranslationsDialogComponent,
    ],
    imports: [
        CardModule,
        ConfirmModule,
        CommonModule,
        FontAwesomeModule,
        MatTableModule,
        ReactiveFormsModule,
        SpecialCharsModule,
        TranslationServiceModule,
    ],
    exports: [TranslationComponent]
})
export class TranslationsModule {}