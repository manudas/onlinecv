import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { DialogModule } from '@app/ui/dialog/dialog.module'
import { PortfolioComponent } from './portfolio.component'
import { TableCardModule } from '@app/ui/table-card/table-card.module'
import { TranslationServiceModule } from '@services/translation'

@NgModule({
    declarations: [
        PortfolioComponent,
    ],
    imports: [
        ConfirmModule,
        CommonModule,
        DialogModule,
        FontAwesomeModule,
        TableCardModule,
        TranslationServiceModule,
    ],
    exports: [PortfolioComponent]
})
export class PortfolioModule { }
