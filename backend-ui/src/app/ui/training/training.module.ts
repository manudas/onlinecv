import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ConfirmModule } from '@app/ui/confirm/confirm.module'
import { TableCardModule } from '@app/ui/table-card/table-card.module'
import { TranslationServiceModule } from '@services/translation'
import { TrainingComponent } from './training.component'

@NgModule({
  declarations: [
    TrainingComponent,
  ],
  imports: [
    ConfirmModule,
    CommonModule,
    FontAwesomeModule,
    TableCardModule,
    TranslationServiceModule,
  ],
  exports: [TrainingComponent]
})
export class TrainingModule { }
