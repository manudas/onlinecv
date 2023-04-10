import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { TableCardModule } from '@app/ui/table-card/table-card.module'
import { TranslationServiceModule } from '@services/translation'
import { MessagingSystemComponent } from './messaging-system.component'

@NgModule({
  declarations: [MessagingSystemComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    TableCardModule,
    TranslationServiceModule
  ],
  exports: [MessagingSystemComponent]
})
export class MessagingSystemModule { }
