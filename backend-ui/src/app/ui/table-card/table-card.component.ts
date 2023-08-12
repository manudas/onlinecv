import { CdkDragDrop } from '@angular/cdk/drag-drop'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { faArrowsAlt, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent {

  // initial state of dragging for reordering working experience
  dragDisabled: boolean                                   = true
  faArrowsAlt: IconDefinition                             = faArrowsAlt
  faEdit: IconDefinition                                  = faEdit
  faTrash: IconDefinition                                 = faTrash

  @Input()
  cardIcon: IconDefinition                                = null
  @Input()
  title: string                                           = ''

  @Input()
  columns: string[]                                       = []
  @Input()
  rows: string[]                                          = []

  @Input()
  isDraggable: boolean                                    = false
  @Input()
  transformFn: Map<string, Function>                      = new Map()
  @Input()
  transformHeaderFn: Map<string, Function>                = new Map()
  @Output()
  onDrop: EventEmitter<CdkDragDrop<unknown[]>> = new EventEmitter<CdkDragDrop<unknown[]>>()

  @Input()
  editCallBack: (...params: unknown[]) => any             = () => null

  @Input()
  deleteCallBack: (...params: unknown[]) => any           = () => null

  onDropEvent: (arg: CdkDragDrop<unknown[]>) => void = (event: CdkDragDrop<unknown[]>) => this.onDrop.emit(event)
  onDragStart( _$event ) {
    const draggingElement: HTMLElement = document.querySelector('mat-row.cdk-drag-preview')
    if (draggingElement) {
      draggingElement.style['box-shadow'] =
        `0 5px 5px -3px rgba(0, 0, 0, 0.2),
        0 8px 10px 1px rgba(0, 0, 0, 0.14),
        0 3px 14px 2px rgba(0, 0, 0, 0.12)`
    }
  }

  edit = (index: number) => this.editCallBack(index)
  delete = (index: number) => this.deleteCallBack(index)
}
