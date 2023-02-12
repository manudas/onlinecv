import { NgModule } from '@angular/core'
import { CardModule } from '@app/ui/card/card.module'
import { CommonModule } from '@angular/common'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { LanguageSkillsModule } from '@app/ui/language-skills/language-skills.module'
import { MatTableModule } from "@angular/material/table"
import { ReactiveFormsModule } from '@angular/forms'
import { SkillsComponent } from './skills.component'
import { SkillsDialogComponent } from './skills-dialog.component'
import { SpecialCharsModule } from '@app/services/specialChars'
import { TranslationServiceModule } from '@services/translation'

@NgModule({
    declarations: [
        SkillsComponent,
        SkillsDialogComponent,
    ],
    imports: [
        ConfirmModule,
        CommonModule,
        DragDropModule,
        LanguageSkillsModule,
        MatTableModule,
        FontAwesomeModule,
        CardModule,
        ReactiveFormsModule,
        SpecialCharsModule,
        TranslationServiceModule,
    ],
    exports: [SkillsComponent]
})
export class SkillsModule {}