import { NgModule } from '@angular/core'
import { TranslationsModule } from '@services/translation'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'


@NgModule({
  declarations: [
    ConfirmComponent,
  ],
  imports: [
    TranslationsModule,
  ],
  exports: [ConfirmComponent],
})
export class ConfirmModule { }
