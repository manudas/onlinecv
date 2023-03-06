import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslationServiceModule } from '@services/translation'

import { LoginComponent } from '@app/ui/login/login.component'
import { LoginService } from './login-service/login.service'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslationServiceModule
  ],
  exports: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule { }
