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

  onDrop($event) {
    // $('#profile').removeClass('dragging hasImage');
    this.dragging = false;
    this.hasImage = false;

    var file = $event.dataTransfer.files[0];
    console.log(file);

    var reader = new FileReader();

    //attach event handlers here...
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      console.log(reader.result);
      // $('#profile').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
      this.hasImage = true;
      this.imageData = reader.result;
    }.bind(this);
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
// ----- On render -----
$(function() {

  $('#profile').addClass('dragging').removeClass('dragging');
});

$('#profile').on('dragover', function() {
  $('#profile').addClass('dragging')
}).on('dragleave', function() {
  $('#profile').removeClass('dragging')
}).on('drop', function(e) {
  $('#profile').removeClass('dragging hasImage');

  if (e.originalEvent) {
    var file = e.originalEvent.dataTransfer.files[0];
    console.log(file);

    var reader = new FileReader();

    //attach event handlers here...

    reader.readAsDataURL(file);
    reader.onload = function(e) {
      console.log(reader.result);
      $('#profile').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');

    }

  }
})
$('#profile').on('click', function(e) {
  console.log('clicked')
  $('#mediaFile').click();
});
window.addEventListener("dragover", function(e) {
  e = e || event;
  e.preventDefault();
}, false);
window.addEventListener("drop", function(e) {
  e = e || event;
  e.preventDefault();
}, false);
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