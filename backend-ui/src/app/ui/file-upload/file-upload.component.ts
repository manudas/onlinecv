import { Component, OnInit, HostListener, Input, Output, EventEmitter, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { logEasy } from '@app/services/logging'
import { TranslationService } from '@app/services/translation/translation.service'
import { FileOptions } from '@app/types/File'
import * as FILE_UTILS from '@app/utils/Files'
import { Observable } from 'rxjs'
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

  // error handling
  incorrectFileType = false
  documentPreviewError = false

  // to be used in the template
  fileUtils = FILE_UTILS

  _data: Blob
  @Input()
  set data(data: Blob) {
    this._data = data
    if (data && this.fileUtils.isBase64Image(data)) {
      this.hasImage = true
    } else {
      this.hasImage = false
    }
    this.dataChange.emit(this._data)
  }
  get data() {
    return this._data
  }

  @Output()
  dataChange: EventEmitter<Blob> = new EventEmitter<Blob>()

  dragging: boolean = false
  hasImage: boolean = false

  mouseOver: boolean = false // used to show some animations

  private resizeObserverInstance

  constructor(private matDialog: MatDialog, private changeDetector: ChangeDetectorRef, private translationService: TranslationService) { }

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

  getBase64Data = () => this.fileUtils.attachUrlDataTypeToBase64(this._data)

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
      this.incorrectFileType = false
    }

    if (file) {
      // could be null when no file has been selected
      const reader = new FileReader()

      //attach event handlers here...
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        this.documentPreviewError = false
        this.data = this.fileUtils.removeUrlDataFromBase64(reader.result)
        this.changeDetector.detectChanges()
      }.bind(this)
    }
  }

  reset(preserveData = false) {
    this.fileReference.nativeElement.value = '';
    if (!preserveData) {
      this.documentPreviewError = false
      this.incorrectFileType = false
      this.data = null
    }
  }

  openActionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: null
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '')
      switch (result) {
        case FileOptions.delete:
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
    if (this.fileUtils.isBase64Image(this.data)) {
      fileName = definedFileTypes.image
    }
    const extension = this.fileUtils.getMainExtension(this.data.toString())
    downloadLink.href = this.getBase64Data();
    downloadLink.download = `${fileName}${extension ? '.' + extension : ''}`
    downloadLink.click();
  }

  handleError(_$event) {
    this.documentPreviewError = true
  }
}
