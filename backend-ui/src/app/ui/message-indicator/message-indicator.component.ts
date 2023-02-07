import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-message-indicator',
  templateUrl: './message-indicator.component.html',
  styleUrls: ['./message-indicator.component.scss']
})
export class MessageIndicator {

  @Input()
  unread:           number              = 5
  @Input()
  zIndex:           number              = 1
}