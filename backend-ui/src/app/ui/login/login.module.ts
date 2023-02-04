import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslationServiceModule } from '@services/translation'

import { LoginComponent } from '@app/ui/login/login.component'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslationServiceModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
