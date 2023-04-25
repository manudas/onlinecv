import { Component, OnInit } from '@angular/core'
import { faCaretDown, faCog, faIdCard, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs'
import { MenuSelector } from '../menu/types'
import { messageMenu, userMenu } from './config'

import { select, Store } from '@ngrx/store'
import { getAdminUser, logOut } from '@app/store/actions/Authentication'
import * as MESSAGING from '@store_actions/Messaging'
import { messagingStoreDef } from '@ui/messaging-system/types'

type StoreDef = { adminUser: string } & messagingStoreDef

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appIcon:  IconDefinition                        = faIdCard
  faCog:    IconDefinition                        = faCog
  faCaretDown: IconDefinition                     = faCaretDown

  userMenu: MenuSelector
  messageMenu: MenuSelector
  messageTypes$: Observable<Array<string>>
  messageTypes: Array<string>                     = []

  private adminUser$: Observable<string>
  public adminUser: string                        = ''

  constructor(private store: Store<StoreDef>) {
    this.adminUser$ = this.store.pipe(select(state => state?.adminUser))
    this.messageTypes$ = this.store.pipe(select( state => state?.messaging?.messageTypes ))
    this.messageTypes$.subscribe( types => { this.messageTypes = types; this.messageMenu = messageMenu(types) })

    this.store.dispatch(getAdminUser())
    this.store.dispatch(MESSAGING.GET_MESSAGING_TYPES())
  }

  logOut = () => this.store.dispatch(logOut())

  ngOnInit(): void {
    this.adminUser$.subscribe(data => {
      this.adminUser = data

      this.userMenu = userMenu(this.adminUser, this.logOut)
    })
    this.userMenu = userMenu(this.adminUser, this.logOut)
  }
}
