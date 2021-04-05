import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as ACTION_DETAILS from '@store_actions/Details'
import { DetailsType, EditSocialNetworkStructure, LocaleStore, SocialNetwork } from '@app/types'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TranslationService } from '@app/services/translation/translation.service'

import { SocialNetworkDialogComponent } from './social-network-dialog.component';
import * as COMMON_ACTIONS from '@store_actions/Common'

type StoreType = { locale: LocaleStore } & { details: {data: DetailsType } } & { socialNetworks: {list: SocialNetwork[] } }
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  faEdit: IconDefinition = faEdit
  faTrash: IconDefinition = faTrash

  details$: Observable<DetailsType>
  details: DetailsType

  socialNetworks$: Observable<SocialNetwork[]>
  socialNetworks: SocialNetwork[] = []
  socialNetworkColsToRender = [
    'id',
    'label',
    'description',
    'edit',
    'delete',
  ]

  translationsToRequest = ['Network deleted successfully']
  translationsObservables: {
      [translationKey: string]: Observable<string>
  } = {}
  translatedStrings: {
      [translationKey: string]: string
  } = {}

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

  constructor(private store: Store<StoreType>, private matDialog: MatDialog, private translate: TranslationService) {
    this.details$ = this.store.pipe(
      select(
        state => state?.details?.data
      )
    )
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.socialNetworks$ = this.store.pipe(select(state => state?.socialNetworks?.list))

    this.translationsToRequest.forEach(translationKey => {
      this.translationsObservables[translationKey] = this.translate.transform(translationKey, this)
      this.translationsObservables[translationKey].subscribe((data: string) => {
        this.translatedStrings[translationKey] = data
      })
    })
  }

  ngOnInit(): void {
    this.selectedLocale$.subscribe((data: string) => {
      this.selectedLocale = data
    })
    this.store.dispatch(ACTION_DETAILS.FETCH_DETAILS({
      language: this.selectedLocale
    }))
    this.details$.subscribe((data: DetailsType) => {
      if (data) {
        this.details = data
        for (const control in this.detailsFormGroup.controls) {
          this.detailsFormGroup.get(control).setValue(this.details[control])
        }
      }
    })
    this.socialNetworks$.subscribe((data: SocialNetwork[]) => {
      if (data) {
        this.socialNetworks = data
        // for (const control in this.detailsFormGroup.co ntrols) {
        //   this.detailsFormGroup.get(control).setValue(this.details[control])
        // }
      }
    })
  }

  submitHandler($event): void {
    if (this.detailsFormGroup.valid /* && this.socialNetworksFormGroup.valid*/) {
      // dispatch 2 actions to the store:
      // 1 - MUTATE_DETAILS
      // 2 - MUTATE_SOCIAL_NETWORKS
      this.store.dispatch(ACTION_DETAILS.SAVE_DETAILS( { details: {...this.detailsFormGroup.value, language: this.selectedLocale} } ))
    } else {
      this.detailsFormGroup.markAllAsTouched()
    }
  }

  openDialog(data?: EditSocialNetworkStructure): void {
    const dialogRef = this.matDialog.open(SocialNetworkDialogComponent, {
      width: '80%',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (this.isEdit(result)) {
        const {
          index,
          network
        } = result
        this.editNetworkValues(index, network)
      } else {
        this.addNetwork(result)
      }
    });
  }

  isEdit(data: SocialNetwork | EditSocialNetworkStructure): data is EditSocialNetworkStructure {
    return (data as EditSocialNetworkStructure).index !== undefined
  }

  addNetwork(networkData: SocialNetwork) {
    this.socialNetworks = [...this.socialNetworks, { ...networkData }]
  }

  deleteNetwork(index: number) {
    const socialNetwork = this.socialNetworks[index]
    if (!socialNetwork.id) { // is not stored yet in DB
      this.socialNetworks = [
        ...this.socialNetworks.slice(0, index),
        ...this.socialNetworks.slice(index + 1)
      ];
      this.store.dispatch(COMMON_ACTIONS.SUCCESS({
        message: this.translatedStrings['Network deleted successfully']
      }))
    } else {

    }
  }

  editNetwork(index: number) {
    const socialNetwork = this.socialNetworks[index]
    this.openDialog({
      network: socialNetwork,
      index
    })
  }

  editNetworkValues(index: number, networkData: SocialNetwork) {
    this.socialNetworks = [
      ...this.socialNetworks.slice(0, index),
      { ...networkData},
      ...this.socialNetworks.slice(index + 1)
    ];
  }

  debug(object: any) {
    console.log(JSON.stringify(object))
  }
}
