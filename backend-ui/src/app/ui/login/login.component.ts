import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { login, singUp } from '@app/store/actions/Authentication';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input()
  adminUserExists = true

  icon: IconDefinition = faIdCard

  formGroup: FormGroup = new FormGroup({
    user: new FormControl(null, [ Validators.required, Validators.email ]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null),
    rememberMe: new FormControl(null)
  }, { validators: this.matchingPasswords() })

  constructor(private store: Store) { }

  ngOnInit(): void { }

  matchingPasswords() {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls.password
      const matchingPasswordControl = formGroup.controls.confirmPassword

      // set error on matchingPasswordControl if validation fails
      if (!this.adminUserExists && passwordControl.value !== matchingPasswordControl.value) {
        matchingPasswordControl.setErrors({ mustMatch: true })

        return { mustMatch: true }
      } else {
        matchingPasswordControl.setErrors(null)

        return null
      }
    }
  }

  singUp() {
    if (this.formGroup.valid) {
      this.store.dispatch(singUp({username: this.formGroup.controls.user.value, password: this.formGroup.controls.password.value, rememberMe: this.formGroup.controls.rememberMe.value}))
    }
  }

  login() {
    if (this.formGroup.valid) {
      this.store.dispatch(login({username: this.formGroup.controls.user.value, password: this.formGroup.controls.password.value, rememberMe: this.formGroup.controls.rememberMe.value}))
    }
  }

}
