import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as ACTION_DETAILS from '@store_actions/Details'
import { DetailsType, LocaleStore } from '@app/types'
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

type StoreType = { locale: LocaleStore } & { details: DetailsType }
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  faEdit: IconDefinition = faEdit
  details$: Observable<DetailsType>

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  @Input() title: string = 'Personal details';

  detailsFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required), // new FormControl(initialValue, validators)
    surname: new FormControl(null),
    nickname: new FormControl(null),
    birthInfo: new FormControl(null),
    address: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email] ),
    phone: new FormControl(null),
    primaryRole: new FormControl(null, Validators.required),
    secondaryRole: new FormControl(null),
  })

  socialNetworksFormGroup: FormGroup = new FormGroup({})

  constructor(private store: Store<StoreType>) {
    this.details$ = this.store.pipe(
      select(
        state => state.details
      )
    )
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => {
      this.selectedLocale = data
    })
    this.store.dispatch(ACTION_DETAILS.FETCH_DETAILS({
      language: this.selectedLocale
    }))

    alert('add hints when errors in form validation happens, so as to be able to submit')
  }

  submitHandler($event): void {
    debugger
    if (this.detailsFormGroup.valid && this.socialNetworksFormGroup.valid) {
      // dispatch 2 actions to the store:
      // 1 - MUTATE_DETAILS
      // 2 - MUTATE_SOCIAL_NETWORKS
    } else {
      this.detailsFormGroup.markAllAsTouched()
      this.socialNetworksFormGroup.markAllAsTouched()
    }
  }
}