import { Component, OnInit, DoCheck, KeyValueDiffers, KeyValueDiffer } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import * as MESSAGING from '@store_actions/Messaging'
import * as ACTION_SETTINGS from '@store_actions/Settings'
import { storeDef } from './types'
import * as INPUT_HELPERS from './inputHelpers'
import { MessageDef } from '@app/types/MessagingSystem'
import { buildDataMap, MetadataDialog } from '../dialog/helpers'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { DialogComponent } from '@app/ui/dialog/dialog.component'
import { SettingsType } from '@app/types'
import { ConfirmComponent } from '@app/ui/confirm/confirm.component'
import { ActivatedRoute } from '@angular/router'

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
  type: string
  data                                            = []
  data$: Observable<MessageDef[]>
  inputData                                       = INPUT_HELPERS
  sendToEmailEnabled: Boolean                     = null
  messagingEmail: string                          = null
  settings$: Observable<SettingsType>
  selectedLocale: string // iso code
  selectedLocale$: Observable<string>

  constructor( private activatedRoute: ActivatedRoute, private store: Store<storeDef>, private differs: KeyValueDiffers, private matDialog: MatDialog ) {
    this.activatedRoute.paramMap.subscribe(params => {
      const passedType: string = params.get('type')
      this.type = passedType
    })
    this.differ = this.differs.find({ }).create()
    this.prepareDataSubscriptions()
    this.openDialog = this.openDialog.bind(this)
  }

  private prepareDataSubscriptions() {
    this.messageTypes$ = this.store.pipe(select( state => state?.messaging?.messageTypes ))
    this.messageTypes$.subscribe( types => this.messageTypes = types )
    this.settings$ = this.store.pipe( select( state => state?.settings?.data ))
    this.settings$.subscribe( (data: SettingsType) => { this.sendToEmailEnabled = data?.sendToEmail; this.messagingEmail = data?.messagingEmail })
    this.data$ = this.store.pipe(select( state => state?.messaging?.messages ))
    this.data$.subscribe( data => this.data = data )
    this.selectedLocale$ = this.store.pipe(select(state => state?.locale?.selectedLocale))
    this.selectedLocale$.subscribe((data: string) => this.selectedLocale = data )
  }

  ngOnInit(): void {
    this.store.dispatch(MESSAGING.GET_MESSAGING_TYPES())
    this.store.dispatch(ACTION_SETTINGS.FETCH_SETTINGS({ language: this.selectedLocale }))
  }

  typeSelected = ({value}) => this.type = value

  ngDoCheck() {
    const change = this.differ.diff(this)
    if (change) {
      change.forEachChangedItem(({ key }) => {
        switch (key) {
          case 'type':
          case 'messageTypes':
            this.type = this.type && this.messageTypes.includes(this.type) ? this.type : this.messageTypes?.[0]
            if (key === 'messageTypes') break
            this.store.dispatch(MESSAGING.GET_MESSAGES({ messageType: this.type }))
        }
      })
    }
  }

  openDialog( index: number = null ): void {
    if (index === null && !this.sendToEmailEnabled) {
      const dialogRef = this.matDialog.open(ConfirmComponent, {
        width: '40%',
        data: new Map<string, MetadataDialog>([ ['metadata', {
          title: 'Operation not possible',
          message: 'Sending an email message is not possible without having configured in Settings the email server in advance',
          buttons: [{ action: 'close', text: 'Close', class: 'btn-outline-info' }]
        }] ])
      })
      dialogRef.afterClosed().subscribe(() => {
        logEasy('The dialog was closed.');
      })
    } else {
      const data = buildDataMap(this.data, index, INPUT_HELPERS, this.title, this.type)
      const buttons = [
        { action: 'close' as const, text: 'Cancel', class: 'btn-outline-info' },
        ...(this.sendToEmailEnabled && this.data[index]?.to === this.messagingEmail && [{ action: 'submit' as const, text: 'Reply', position: 'right', class: 'submitButton' }] || []),
        ...(this.sendToEmailEnabled && this.data[index]?.to !== this.messagingEmail && [{ action: 'submit' as const, text: 'Send', position: 'right', class: 'submitButton' }] || [])
      ]
      data.set('metadata', {...data.get('metadata'), buttons })
      const dialogRef = this.matDialog.open(DialogComponent, { width: '80%', data })
      dialogRef.afterClosed().subscribe((result: MessageDef) => {
        logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
        if (result) {
          if(result.to === this.messagingEmail) [result.to, result.from] = [result.from, result.to]
          result.message =
            result.message
            + '\n'
            + '\n======================='
            + `\n${new Date( Number(this.data[index].date) ).toLocaleDateString()}`
            + '\n======================='
            + `\n${this.data[index].message}`

          this.store.dispatch(MESSAGING.SEND_MESSAGE({ message: result, language: this.selectedLocale, currentMessageType: this.type}))
        }
      })
    }
  }

  openRemovalConfirmDialog = ( index: number ): void => {
    const message = this.data[index]
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: new Map<string, MessageDef | MetadataDialog>([ ['element', message], ['metadata', { index, superType: 'message', nameKey: 'subject', action: 'delete' }] ])
    })

    dialogRef.afterClosed().subscribe(({
      index = null,
      element = null,
    } = {}) => {
      logEasy(`The dialog was closed.`, index !== null ? `The following message was received: ${JSON.stringify(element)}` : '');
      if (index !== null) this.delete(index)
    })
  }

  delete = ( index: number ) => {
    const message = this.data[index]
    this.store.dispatch(MESSAGING.DELETE_MESSAGE( { id: message.id, currentMessageType: this.type }) )
  }
}