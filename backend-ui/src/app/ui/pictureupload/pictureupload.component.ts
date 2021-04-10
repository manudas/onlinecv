import { Component, OnInit, HostListener, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { attachUrlDataTypeToBase64, removeUrlDataFromBase64 } from '@app/utils/Images';

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
    }
  }
  get imageData() {
    return this._imageData
  }

  @Output()
  imageDataChange: EventEmitter<Blob> = new EventEmitter<Blob>()

  dragging: boolean = false
  hasImage: boolean = false;

  // file is not needed, for now
  file: File = null;

  constructor() { }

  ngOnInit(): void {
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
        this.file = file
        this.imageDataChange.emit(this.imageData)
      }.bind(this);
    }
    $event.preventDefault();
  }

  resetInput($event) {
    const {
      dataTransfer: { // comes from drag and drop
        files: [
          {
            name: dragName = null
          } = {}
        ]
      }
    } = $event

    if (dragName) {
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
