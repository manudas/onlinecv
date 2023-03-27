import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { DialogModule } from '@app/ui/dialog/dialog.module'
import { LanguageSkillsModule } from '@app/ui/language-skills/language-skills.module'
import { SkillsComponent } from './skills.component'
import { TableCardModule } from '@app/ui/table-card/table-card.module'
import { TranslationServiceModule } from '@services/translation'

@NgModule({
    declarations: [
        SkillsComponent,
    ],
    imports: [
        ConfirmModule,
        DialogModule,
        CommonModule,
        LanguageSkillsModule,
        FontAwesomeModule,
        TableCardModule,
        TranslationServiceModule
    ],
    exports: [SkillsComponent]
})
export class SkillsModule {}