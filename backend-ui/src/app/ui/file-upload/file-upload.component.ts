import { Component, OnInit, HostListener, Input, Output, EventEmitter, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { FileOptions } from '@app/types/File'
import * as FILE_UTILS from '@app/utils/Files'
import { ConfirmComponent } from './confirm.component'
import { acceptedFileType, definedFileTypes } from '@utils/Files'

declare var ResizeObserver
@Component({
  selector: 'app-fileupload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileuploadComponent implements OnInit, OnDestroy {

  @ViewChild('fileReference') fileReference
  @ViewChild('imageContainer') imageContainer

  @Input()
  name?: string

  @Input()
  isLargeDocument?: boolean = false
  largeDocumentHeight: number = 0

  @Input()
  accept?: keyof typeof definedFileTypes
  acceptedExtensions?: string[]

  @Input()
  resetOnDataChange?: boolean = false
  @Input()
  retainOnMetadata?: boolean = true

  // error handling
  incorrectFileType = false
  documentPreviewError = false

  // used for emitting event about the deleted or the added image
  metadata: unknown

  @Input()
  allowDeselection: boolean = false
  @Input()
  allowChange: boolean = true

  _data: Blob
  @Input()
  set data(data: Blob | { data: Blob, metadata: unknown } )  {
    const passedData: Blob = data && typeof data === 'object' && 'data' in data ? data.data: data as Blob
    const metadata: unknown = data && typeof data === 'object' && 'metadata' in data ? data.metadata : undefined
    if (metadata != null) {
      this.metadata = metadata
    }
    this._data = passedData
    if (this._data && FILE_UTILS.isBase64Image(this._data)) {
      this.hasImage = true
    } else {
      this.hasImage = false
    }
    this.dataChange.emit(this.metadata != null ? { data: this._data, metadata: this.metadata } : this._data)
    if ( this.resetOnDataChange && this._data ) {
      // reset if !this.retainOnMetadata || (this.retainOnMetadata && !!this.metadata)
      if (!this.retainOnMetadata || (this.retainOnMetadata && this.metadata == null)) {
        this.reset()
      }
    }
  }
  get data() {
    return this._data
  }

  // Accepted events
  @Output()
  dataChange: EventEmitter<Blob | { data: Blob, metadata: unknown }> = new EventEmitter<Blob | { data: Blob, metadata: unknown }>()
  @Output()
  onDeselect: EventEmitter<unknown | undefined> = new EventEmitter<unknown | undefined>()
  @Output()
  onDelete: EventEmitter<unknown | undefined> = new EventEmitter<unknown | undefined>()

  dragging: boolean = false
  hasImage: boolean = false

  mouseOver: boolean = false // used to show some animations

  private resizeObserverInstance

  constructor(private matDialog: MatDialog, private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.isLargeDocument) {
      this.resizeObserverInstance = new ResizeObserver(
          (entries) => {
              entries.forEach((entry) => {
                const { clientWidth } = this?.imageContainer?.nativeElement ?? {clientWidth: 0}
                this.largeDocumentHeight = clientWidth
                this.changeDetector.detectChanges()
              })
          }
      )
      this.resizeObserverInstance.observe(document.documentElement)
    }
    if (this.accept) {
      this.acceptedExtensions = acceptedFileType[this.accept].map(e => `.${e}`)
    }
  }

  ngOnDestroy() {
    this.resizeObserverInstance && this.resizeObserverInstance.unobserve(document.documentElement)
  }

  onClickHandler($event) {
    if (!this.data) {
      this.fileReference.nativeElement.click()
    } else {
      this.openActionDialog()
    }
  }

  onDragOver($event) {
    this.dragging = true
    $event.preventDefault()
  }

  onDragLeave($event) {
    this.dragging = false
  }

  getBase64Data = () => FILE_UTILS.attachUrlDataTypeToBase64(this._data)

  onReceiveFile($event) {
    $event.preventDefault()
    this.dragging = false

    const {
      dataTransfer: {
        files: [ file  = null]
      } = $event.target
    } = $event

    if (this.acceptedExtensions && !this.acceptedExtensions?.some(ext => file?.name.endsWith(ext))) {
      this.incorrectFileType = true
      return

    } else {
      this.reset()
    }

    if (file) {
      // could be null when no file has been selected
      const reader = new FileReader()

      //attach event handlers here...
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        this.data = FILE_UTILS.removeUrlDataFromBase64(reader.result)
        this.changeDetector.detectChanges()
      }.bind(this)
    }
  }

  reset(preserveData = false) {
    this.fileReference.nativeElement.value = '';
    if (!preserveData) {
      this.documentPreviewError = false
      this.documentInitialised = false
      this.incorrectFileType = false
      this.data = null
      this.metadata = null
    }
  }

  openActionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: {
        allowDeselection: this.allowDeselection,
        allowChange: this.allowChange
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
      switch (result) {
        case FileOptions.deselect:
          this.onDeselect.emit(this.metadata != null ? this.metadata : undefined)
          this.reset()
          break
        case FileOptions.delete:
          this.onDelete.emit(this.metadata != null ? this.metadata : undefined)
          this.reset()
          break
        case FileOptions.download:
          this.downloadFile()
          break
        case FileOptions.change:
          this.reset(true)
          this.fileReference.nativeElement.click()
          break
        case FileOptions.cancel:
        default: // for cancel
          // nothing
      }
    })
  }

  @HostListener('document:dragover', ['$event'])
  @HostListener('drop', ['$event'])
  onDragDropFileVerifyZone(event) {
    if (event.target.matches('#dropArea')) {
      // In drop zone. I don't want listeners later in event-chain to meddle in here
      event.stopPropagation()
    } else {
      // Outside of drop zone! Prevent default action, and do not show copy/move icon
      event.preventDefault()
      event.dataTransfer.effectAllowed = 'none'
      event.dataTransfer.dropEffect = 'none'
    }
  }

  downloadFile() {
    const downloadLink = document.createElement('a')
    let fileName =  definedFileTypes.document
    if (FILE_UTILS.isBase64Image(this.data)) {
      fileName = definedFileTypes.image
    }
    const extension = FILE_UTILS.getMainExtension(this.data.toString())
    downloadLink.href = this.getBase64Data();
    downloadLink.download = `${fileName}${extension ? '.' + extension : ''}`
    downloadLink.click();
  }



  documentInitialised = false
  // error handling
  handleError(_$event) {
    this.documentPreviewError = true
  }

  /*
   * Firefox doens't get well with sanatising resource urls
   * so we don't have any choice but to do it like this
   */
  confirmLoading($event) {
    const {
      target
    } = $event
    if (!this.documentInitialised) {
      target.type = FILE_UTILS.getBase64MimeType(this.data.toString())
      target.data = this.getBase64Data() + '#toolbar=0'
      this.documentPreviewError = false
      this.documentInitialised = true
    }
  }
}
