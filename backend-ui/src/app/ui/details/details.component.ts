import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as ACTION_DETAILS from '@store_actions/Details'
import { DetailsType, LocaleStore, SocialNetwork } from '@app/types'
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SocialNetworkDialogComponent } from './social-network-dialog.component';

type StoreType = { locale: LocaleStore } & { details: {data: DetailsType } } & { socialNetworks: {list: SocialNetwork[] } }
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  faEdit: IconDefinition = faEdit
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

  constructor(private store: Store<StoreType>, private matDialog: MatDialog) {
    this.details$ = this.store.pipe(
      select(
        state => state?.details?.data
      )
    )
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.socialNetworks$ = this.store.pipe(select(state => state?.socialNetworks?.list))
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















// AÑADIR MATERIAL DESIGN DIALOG
// POR LO QUE VEO ( Y TIENE SENTIDO, ESTE COMPONENTE HABRA QUE SACARLO FUERA A OTRO COMPONENTE)
  openDialog(): void {
    const dialogRef = this.matDialog.open(SocialNetworkDialogComponent, {
      width: '80%',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (result) {
        this.addNetwork(result);
      }
    });
  }

  getSocialNetworkTableValue(networkData: SocialNetwork, columnName: string, rowIndex: number) {
    const indexInSocialNetworkArr = this.socialNetworks.indexOf(networkData)
    if (columnName === 'delete') {
      return
    } else if (columnName === 'edit') {
      return
    }
    return networkData[columnName]
  }

  addNetwork(networkData: SocialNetwork) {
    this.socialNetworks = [...this.socialNetworks, { ...networkData }] // this works but doens't looks too nice
    // this.socialNetworks.data.push({ ...networkData })
  }

  debug(object: any) {
    console.log(JSON.stringify(object))
  }
}