import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { DialogModule } from '@app/ui/dialog/dialog.module'
import { TableCardModule } from '@app/ui/table-card/table-card.module'
import { TranslationServiceModule } from '@services/translation'
import { ExperienceComponent } from './experience.component'

@NgModule({
    declarations: [
        ExperienceComponent,
    ],
    imports: [
        ConfirmModule,
        CommonModule,
        DialogModule,
        FontAwesomeModule,
        TableCardModule,
        TranslationServiceModule,
    ],
    exports: [ExperienceComponent]
})
export class ExperienceModule {}
