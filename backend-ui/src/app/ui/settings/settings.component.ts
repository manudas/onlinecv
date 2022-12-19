import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Observable } from 'rxjs'
import { LocaleStore, SettingsType } from '@app/types'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as ACTION_SETTINGS from '@store_actions/Settings'
import { logEasy } from '@app/services/logging'

type StoreType = { locale: LocaleStore } & { settings: {data: SettingsType } }
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  cardIcon: IconDefinition = faCog

  settings$: Observable<SettingsType>
  settings: SettingsType

  _backgroundImage: Blob
  get backgroundImage() {
    return this._backgroundImage
  }
  set backgroundImage(image: Blob) {
    this._backgroundImage = image
    this.settingsFormGroup.get('backgroundImage').setValue(image)
  }
  set backgroundImageFromSubscription(image: Blob) {
    this._backgroundImage = image
  }

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  @Input() title: string = 'APP Settings'

  public settingsFormGroup: FormGroup = new FormGroup({
    backgroundImage: new FormControl(null),
    sendToEmail: new FormControl(false),
    smtpServer: new FormControl(null, this.ValidateRequiredIfMessagingToEmailEnabled),
    smtpPort: new FormControl(25, this.ValidateRequiredIfMessagingToEmailEnabled),
    smtpUsername: new FormControl(null, this.ValidateRequiredIfMessagingToEmailEnabled),
    smtpPassword: new FormControl(null, this.ValidateRequiredIfMessagingToEmailEnabled),
    messagingEmail: new FormControl(null, [Validators.email, this.ValidateRequiredIfMessagingToEmailEnabled]),
  })

  constructor(private store: Store<StoreType>) {
    this.settings$ = this.store.pipe(
      select(
        state => state?.settings?.data
      )
    )
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.settingsFormGroup.controls.backgroundImage.valueChanges.subscribe((newImage: Blob) => {this.backgroundImageFromSubscription = newImage})
    this.settingsFormGroup.controls.sendToEmail.valueChanges.subscribe((isMailSystemEnabled: boolean) => {
      if (isMailSystemEnabled) this.enableMailingSystem()
      else this.disableMailingSystem()
    })
    this.settingsFormGroup.controls.sendToEmail.value ? this.enableMailingSystem() : this.disableMailingSystem()
  }

  disableMailingSystem() {
    this.settingsFormGroup.controls.smtpServer.disable()
    this.settingsFormGroup.controls.smtpPort.disable()
    this.settingsFormGroup.controls.smtpUsername.disable()
    this.settingsFormGroup.controls.smtpPassword.disable()
    this.settingsFormGroup.controls.messagingEmail.disable()
  }

  enableMailingSystem() {
    this.settingsFormGroup.controls.smtpServer.enable()
    this.settingsFormGroup.controls.smtpPort.enable()
    this.settingsFormGroup.controls.smtpUsername.enable()
    this.settingsFormGroup.controls.smtpPassword.enable()
    this.settingsFormGroup.controls.messagingEmail.enable()
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => {
      this.selectedLocale = data
    })
    this.store.dispatch(ACTION_SETTINGS.FETCH_SETTINGS({
      language: this.selectedLocale
    }))
    this.settings$.subscribe((data: SettingsType) => {
      if (data) {
        this.settings = data
        for (const control in this.settingsFormGroup.controls) {
          this.settingsFormGroup.get(control).setValue(this.settings[control])
        }
      }
    })
  }

  submitHandler($event): void {
    if (this.settingsFormGroup.valid) {
      this.store.dispatch(ACTION_SETTINGS.SAVE_SETTINGS( { settings: {...this.settingsFormGroup.value, language: this.selectedLocale} } ))
    } else {
      this.settingsFormGroup.markAllAsTouched()
    }
  }

  ValidateRequiredIfMessagingToEmailEnabled(control: AbstractControl) {
    if (control.parent?.get('sendToEmail').value === true && !control.value) {
      return { isRequiredIfMessageToEmail: true };
    }
    return null;
  }

  debug(obj) {
    logEasy(obj)
    return true
  }
}
