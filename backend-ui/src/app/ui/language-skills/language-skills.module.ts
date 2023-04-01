import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DialogModule } from '@app/ui/dialog/dialog.module'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { LanguageSkillsComponent } from './language-skills.component'
import { TableCardModule } from '@app/ui/table-card/table-card.module'
import { TranslationServiceModule } from '@services/translation'
@NgModule({
    declarations: [
        LanguageSkillsComponent,
    ],
    imports: [
        ConfirmModule,
        CommonModule,
        DialogModule,
        FontAwesomeModule,
        TableCardModule,
        TranslationServiceModule,
    ],
    exports: [LanguageSkillsComponent]
})
export class LanguageSkillsModule { }