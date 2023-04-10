import { Component, OnInit, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import * as MESSAGING from '@store_actions/Messaging'
import { storeDef } from './types'
import * as INPUT_HELPERS from './inputHelpers'
import { MessageDef } from '@app/types/MessagingSystem'
import { buildDataMap } from '../dialog/helpers'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import { SettingsType } from '@app/types'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'

@Component({
  selector: 'app-messaging-system',
  templateUrl: './messaging-system.component.html',
  styleUrls: ['./messaging-system.component.scss']
})
export class MessagingSystemComponent implements OnInit, DoCheck {
  cardIcon: IconDefinition                        = faEnvelope
  differ: KeyValueDiffer<string, any>
  messageTypes$: Observable<Array<string>>
  messageTypes: Array<string>                     = []
  title: string                                   = 'Messaging System'
  type: string                                    = null
  data                                            = []
  data$: Observable<MessageDef[]>
  inputData                                       = INPUT_HELPERS
  sendToEmailEnabled: Boolean                     = null
  settings$: Observable<SettingsType>

  constructor( private store: Store<storeDef>, private differs: KeyValueDiffers, private matDialog: MatDialog ) {
    this.differ = this.differs.find({ }).create()
    this.prepareDataSubscriptions()
  }

  private prepareDataSubscriptions() {
    this.messageTypes$ = this.store.pipe(select( state => state?.messaging?.messageTypes ))
    this.messageTypes$.subscribe( types => this.messageTypes = types )
    this.settings$ = this.store.pipe( select( state => state?.settings?.data ))
    this.settings$.subscribe( (data: SettingsType) => this.sendToEmailEnabled = data?.sendToEmail )
    this.data$ = this.store.pipe(select( state => state?.messaging?.messages ))
    this.data$.subscribe( data => this.data = data )
  }

  ngOnInit(): void {
    this.store.dispatch(MESSAGING.GET_MESSAGING_TYPES())
  }

  typeSelected = ({value}) => this.type = value

  ngDoCheck() {
    const change = this.differ.diff(this)
    if (change) {
      change.forEachChangedItem(({ key }) => {
        switch (key) {
          case 'type':
            this.store.dispatch(MESSAGING.GET_MESSAGES({ messageType: this.type }))
            break
          case 'messageTypes':
            this.type = this.messageTypes?.[0]
            break
        }
      })
    }
  }

  openDialog( index: number = null ): void {
    if (!this.sendToEmailEnabled) {
      // const dialogRef = this.matDialog.open(ConfirmComponent, { width: '80%', data: { index, nameKey: 'role', superType: 'experience', action: 'cancel' } })
      const dialogRef = this.matDialog.open(ConfirmComponent, { width: '80%', data: { index, nameKey: 'tag', superType: 'skill', action: 'delete' } })

      dialogRef.afterClosed().subscribe(({
        index = null,
        element: {type = null} = {},
      } = {}) => {
        logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(index)}` : '');
        // if (index !== null && type !== null) this.delete(type)(index)
      })
    } else {
      const data = buildDataMap(this.data, index, INPUT_HELPERS, this.title, this.type)
      const dialogRef = this.matDialog.open(DialogComponent, { width: '80%', data })
  ////DATE DEBE ESTAR SOLO PARA CONSULTA Y NO SER MODIFICABLE. PONER ALGO ASI COMO disabled en type

  //POR OTRO lado, MESSAGE DEBE SER MULTILINEA
      dialogRef.afterClosed().subscribe((result: MessageDef) => {
        logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
        if (result) {
          console.log(result)
        }
      })
    }
  }
}