import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { TranslationServiceModule } from '@services/translation'

import { MessageIndicator } from './message-indicator.component'

@NgModule({
  declarations: [MessageIndicator],
  imports: [
    CommonModule,
    TranslationServiceModule
  ],
  exports: [MessageIndicator]
})
export class MessageIndicatorModule { }
