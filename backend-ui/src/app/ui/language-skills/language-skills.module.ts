import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from "@angular/material/table"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { CardModule } from '@app/ui/card/card.module'
import { TranslationServiceModule } from '@services/translation'
import { LanguageSkillsComponent } from './language-skills.component'
import { LanguageDialogComponent } from './language-skills-dialog.component'
import { SpecialCharsModule } from '@app/services/specialChars'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
    declarations: [
        LanguageSkillsComponent,
        LanguageDialogComponent,

    ],
    imports: [
        ConfirmModule,
        CommonModule,
        DragDropModule,
        MatTableModule,
        FontAwesomeModule,
        CardModule,
        ReactiveFormsModule,
        SpecialCharsModule,
        TranslationServiceModule,
    ],
    exports: [LanguageSkillsComponent]
})
export class LanguageSkillsModule {}