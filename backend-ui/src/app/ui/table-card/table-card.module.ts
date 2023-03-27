import { CommonModule } from '@angular/common'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatTableModule } from "@angular/material/table"
import { NgModule } from '@angular/core'

import { CardModule } from '@app/ui/card/card.module'
import { SpecialCharsModule } from '@app/services/specialChars'
import { TableCardComponent } from './table-card.component'
import { TranslationServiceModule } from '@services/translation'

@NgModule({
  declarations: [TableCardComponent],
  imports: [
    CardModule,
    CommonModule,
    DragDropModule,
    FontAwesomeModule,
    MatTableModule,
    SpecialCharsModule,
    TranslationServiceModule
  ],
  exports: [TableCardComponent]
})
export class TableCardModule { }
