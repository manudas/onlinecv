import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons'

import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import * as ACTION_DETAILS from '@store_actions/Details'
import { DetailsType } from '@app/types'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  faEdit: IconDefinition = faEdit
  details$: Observable<DetailsType>

  @Input() title: string = 'Personal details';

  constructor(private store: Store<{ details: DetailsType }>) {
    this.details$ = this.store.pipe(
      select(
        state => state.details
      )
    )
  }

  ngOnInit(): void {
    this.store.dispatch(ACTION_DETAILS.FETCH_DETAILS())
  }

}