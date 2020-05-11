import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pictureupload',
  templateUrl: './pictureupload.component.html',
  styleUrls: ['./pictureupload.component.scss']
})
export class PictureuploadComponent implements OnInit {

  dragging: boolean = false
  hasImage:boolean = false;
  imageData: Blob = null;
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

  onReceiveFile($event) {
    // $('#profile').removeClass('dragging hasImage');
    this.dragging = false;
    // this.hasImage = false;

    const file = $event.dataTransfer ? 
                    $event.dataTransfer.files[0] 
                    :  $event.target ? $event.target.files[0] 
                      : null;

    if (file) {
      // could be null when no file has been selected
      const reader = new FileReader();

      //attach event handlers here...
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        this.hasImage = true;
        this.imageData = reader.result;
        this.file = file
      }.bind(this);
    }
    $event.preventDefault();
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



/*

$('#mediaFile').change(function(e) {

  var input = e.target;
  if (input.files && input.files[0]) {
    var file = input.files[0];

    var reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function(e) {
      console.log(reader.result);
      $('#profile').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
    }
  }
})
*/