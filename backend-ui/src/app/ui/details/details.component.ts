import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  faEdit,
  faTrash,
  faArrowsAlt
} from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as ACTION_DETAILS from '@store_actions/Details'
import * as SOCIAL_NETWORK_ACTIONS from '@store_actions/SocialNetworks'

import { DetailsType, EditSocialNetworkStructure, LocaleStore, SocialNetwork } from '@app/types'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TranslationService } from '@app/services/translation/translation.service'

import { SocialNetworkDialogComponent } from './social-network-dialog.component';
import * as COMMON_ACTIONS from '@store_actions/Common'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfirmComponent } from './confirm.component';
import { logEasy } from '@app/services/logging';

type StoreType = { locale: LocaleStore } & { details: {data: DetailsType } } & { socialNetworks: {list: SocialNetwork[] } }
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  faEdit: IconDefinition = faEdit
  faTrash: IconDefinition = faTrash
  faArrowsAlt: IconDefinition = faArrowsAlt

  // initial state of dragging for reordering social networks
  dragDisabled: boolean = true

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
    'order',
  ]

  _profileImage: Blob
  get profileImage() {
    return this._profileImage
  }
  set profileImage(image: Blob) {
    this._profileImage = image
    this.detailsFormGroup.get('profileImage').setValue(image)
  }
  set profileImageFromSubscription(image: Blob) {
    this._profileImage = image
  }

  translationsToRequest = ['Network deleted successfully']

  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  @Input() title: string = 'Personal details';

  detailsFormGroup: FormGroup = new FormGroup({
    profileImage: new FormControl(null),
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

  getNicknameOrName() {
    const nickname = this.detailsFormGroup.get('nickname').value
    const name = this.detailsFormGroup.get('name').value

    return nickname
      ? nickname
      : (name
          ? name
          : null
        )
  }

  constructor(private store: Store<StoreType>, private matDialog: MatDialog, private translate: TranslationService) {
    this.details$ = this.store.pipe(
      select(
        state => state?.details?.data
      )
    )
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.socialNetworks$ = this.store.pipe(select(state => state?.socialNetworks?.list))

    this.translate.prefetch(this.translationsToRequest, this)

    this.detailsFormGroup.controls.profileImage.valueChanges.subscribe((newImage: Blob) => {this.profileImageFromSubscription = newImage})
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
    this.store.dispatch(SOCIAL_NETWORK_ACTIONS.FETCH_NETWORKS({
      language: this.selectedLocale
    }))
    this.socialNetworks$.subscribe((data: SocialNetwork[]) => {
      if (data) {
        this.socialNetworks = data
      }
    })
  }

  submitHandler($event): void {
    if (this.detailsFormGroup.valid) {
      this.store.dispatch(ACTION_DETAILS.SAVE_DETAILS( { details: {...this.detailsFormGroup.value, language: this.selectedLocale} } ))
      this.store.dispatch(SOCIAL_NETWORK_ACTIONS.SAVE_NETWORKS( { socialNetworks: [...this.socialNetworks] } ))
















console.log('would it be good to accompany alt and title in the image in the front end?')
    //  hasta aqui es barato de hacer. A partir de aqui, subir la imagen es bastante caro, por lo que haría falta desde mi punto de vista tener un flag dirty en la imagen y comprobarlo aqui
    // this.store.dispatch(IMAGE_ACTIONS.SAVE_PROFILE_IMAGE( { image: this.profileImage } ))



















    } else {
      this.detailsFormGroup.markAllAsTouched()
    }
  }

  openSocialNetworkDialog(data?: EditSocialNetworkStructure): void {
    const dialogRef = this.matDialog.open(SocialNetworkDialogComponent, {
      width: '80%',
      data
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      if (result) {
        if (this.isSocialNetworkEdit(result)) {
          const {
            index,
            network
          } = result
          this.editNetworkValues(index, network)
        } else {
          this.addNetwork(result)
        }
      }
    })
  }

  openNetworkRemovalConfirmDialog(networkIndex: number): void {
    const network = this.socialNetworks[networkIndex]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        index: networkIndex,
        network: network
      }
    })

    dialogRef.afterClosed().subscribe((indexToRemove = null) => {
      console.log(`The dialog was closed.`, indexToRemove !== null ? `The following message was received: ${JSON.stringify(indexToRemove)}` : '');

      if (indexToRemove !== null) {
        this.deleteNetwork(indexToRemove)
      }

    })
  }

  isSocialNetworkEdit(data: SocialNetwork | EditSocialNetworkStructure | Object = {}): data is EditSocialNetworkStructure {
    return (data as EditSocialNetworkStructure).index !== undefined
  }

  addNetwork(networkData: SocialNetwork) {
    this.editNetworkValues(this.socialNetworks.length, networkData)
    // this.socialNetworks = [...this.socialNetworks, { ...networkData, language: this.selectedLocale, order: this.socialNetworks.length }]
  }

  deleteNetwork(index: number) {
    const socialNetwork = this.socialNetworks[index]
    if (!socialNetwork.id) { // is not stored yet in DB
      this.socialNetworks = [
        ...this.socialNetworks.slice(0, index),
        ...this.socialNetworks.slice(index + 1)
      ];
      this.store.dispatch(COMMON_ACTIONS.SUCCESS({
        message: this.translate.getResolvedTranslation('Network deleted successfully', this)
      }))
    } else {
      this.store.dispatch(SOCIAL_NETWORK_ACTIONS.REMOVE_NETWORK({
        id: socialNetwork.id
      }))
    }
  }

  editNetwork(index: number) {
    const socialNetwork = this.socialNetworks[index]
    this.openSocialNetworkDialog({
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

  onDrop(event: CdkDragDrop<SocialNetwork[]>) {
    this.dragDisabled = true

    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.socialNetworks, event.previousIndex, event.currentIndex)
      // let's assign the new order properties inside the reordered list of objects
      this.socialNetworks = this.socialNetworks.map((currentNetwork, indexInArr): SocialNetwork  => {
        currentNetwork['order'] = indexInArr
        return currentNetwork
      })
    }
  }

  onDragStart($event) {
    const draggingElement: HTMLElement = document.querySelector('mat-row.cdk-drag-preview')
    if (draggingElement) {
      draggingElement.style['box-shadow'] =
        `0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12)`
    }
  }

  debug(object: any) {
    console.log(JSON.stringify(object))
  }
}
