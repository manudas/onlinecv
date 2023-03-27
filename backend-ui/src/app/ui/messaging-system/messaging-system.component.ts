import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as MESSAGING from '@store_actions/Messaging'
import { storeDef } from './types';

@Component({
  selector: 'app-messaging-system',
  templateUrl: './messaging-system.component.html',
  styleUrls: ['./messaging-system.component.scss']
})
export class MessagingSystemComponent implements OnInit {

  messageTypes$: Observable<Array<string>>
  messageTypes: Array<string> = []

  constructor(private store: Store<storeDef>) {
    this.messageTypes$ = this.store.pipe(select(store => store?.messaging?.messageTypes))
    this.messageTypes$.subscribe((types) => this.messageTypes = types)
  }

  ngOnInit(): void {
    this.store.dispatch(MESSAGING.GET_MESSAGING_TYPES())
  }
}