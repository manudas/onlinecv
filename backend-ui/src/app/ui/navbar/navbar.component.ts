import { Component, OnInit } from '@angular/core'
import { faCaretDown, faCog, faIdCard, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Observable } from 'rxjs'
import { MenuSelector } from '../menu/types'
import { messageMenu, userMenu } from './config'

import { select, Store } from '@ngrx/store'
import { getAdminUser } from '@app/store/actions/Authentication'

type StoreDef = { adminUser: string }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appIcon:  IconDefinition   = faIdCard
  faCog:    IconDefinition   = faCog
  faCaretDown: IconDefinition = faCaretDown

  userMenu: MenuSelector
  messageMenu: MenuSelector

  private adminUser$: Observable<string>
  public adminUser: string = ''

  constructor(private store: Store<StoreDef>) {
    this.adminUser$ = this.store.pipe(select(state => state?.adminUser))
    this.store.dispatch(getAdminUser())
  }

  ngOnInit(): void {
    this.adminUser$.subscribe(data => {
      this.adminUser = data

      this.userMenu = userMenu(this.adminUser)
    })
    this.userMenu = userMenu(this.adminUser)
    this.messageMenu = messageMenu
  }
}
