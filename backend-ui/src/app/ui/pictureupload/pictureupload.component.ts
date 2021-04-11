import { Component, OnInit, HostListener, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { logEasy } from '@app/services/logging';
import { PictureOptions } from '@app/types/Picture';
import { attachUrlDataTypeToBase64, removeUrlDataFromBase64 } from '@app/utils/Images';
import { ConfirmComponent } from './confirm.component';

@Component({
  selector: 'app-pictureupload',
  templateUrl: './pictureupload.component.html',
  styleUrls: ['./pictureupload.component.scss']
})
export class PictureuploadComponent implements OnInit {

  @ViewChild('mediaFile') mediaFile

  @Input()
  name: string

  _imageData: Blob
  @Input()
  set imageData(image: Blob) {
    this._imageData = image
    if (image) {
      this.hasImage = true
    } else {
      this.hasImage = false
      this.resetInput()
    }
    this.imageDataChange.emit(this._imageData)
  }
  get imageData() {
    return this._imageData
  }

  @Output()
  imageDataChange: EventEmitter<Blob> = new EventEmitter<Blob>()

  dragging: boolean = false
  hasImage: boolean = false

  mouseOver: boolean = false // used to show some animations

  // file is not needed, for now
  // file: File = null;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClickHandler($event) {
    if (!this.hasImage) {
      this.mediaFile.nativeElement.click()
    } else {
      this.openActionDialog()
    }
  }

  onDragOver($event) {
    this.dragging = true;
    $event.preventDefault();
  }

  onDragLeave($event) {
    this.dragging = false;
  }

  getBase64ImageData = () => attachUrlDataTypeToBase64(this.imageData)

  onReceiveFile($event) {
    this.dragging = false;

    const {
      dataTransfer: {
        files: [ file  = null]
      } = $event.target
    } = $event

    if (file) {
      // could be null when no file has been selected
      const reader = new FileReader();

      //attach event handlers here...
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // this.hasImage = true; // done in getter automatically now
        this.imageData = removeUrlDataFromBase64(reader.result)
        // this.file = file
      }.bind(this);
    }
    $event.preventDefault();
  }

  resetInput($event = null) {
    const {
      dataTransfer: { // comes from drag and drop
        files: [
          {
            name: dragName = null
          } = {}
        ] = []
      } = {}
    } = $event || {}

    // si no reseteamos con evento de drag
    // o si lo hacemos con el, si tenemos
    // un nombre para el archivo a comparar
    // -------------------------------------
    // this.mediaFile to avoid crash if set
    // is executed before mediaFile is loaded
    if (this.mediaFile && (!$event || dragName)) {
      const {
        nativeElement: {
          files: [
            {
              name: inputName = null
            } = {}
          ]
        }
      } = this.mediaFile

      if (inputName && inputName !== dragName) {
        this.mediaFile.nativeElement.value = ''
      }
    }
  }

  openActionDialog(): void {
    const dialogRef = this.matDialog.open(ConfirmComponent, {
      width: '80%',
      data: null
    })

    dialogRef.afterClosed().subscribe(result => {
      logEasy(`The dialog was closed.`, result ? `The following message was received: ${JSON.stringify(result)}` : '');
      switch (result) {
        case PictureOptions.delete:
          this.imageData = null
          break
        case PictureOptions.upload:
          this.mediaFile.nativeElement.click()
          break
        // case PictureOptions.cancel
        default: // for cancel
          // nothing
      }
    })
  }

  @HostListener('document:dragover', ['$event'])
  @HostListener('drop', ['$event'])
  onDragDropFileVerifyZone(event) {
    if (event.target.matches('#profile')) {
      // In drop zone. I don't want listeners later in event-chain to meddle in here
      event.stopPropagation();
    } else {
      // Outside of drop zone! Prevent default action, and do not show copy/move icon
      event.preventDefault();
      event.dataTransfer.effectAllowed = 'none'
      event.dataTransfer.dropEffect = 'none'
    }
  }
}
