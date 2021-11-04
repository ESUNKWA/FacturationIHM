import { Component, OnInit, ViewChild } from '@angular/core';
import { CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  
  imageUrl: any = 'assets/images/placeholder.jpg';
  resultImage: any;

  // Plugin configuration
  config = {
    zoomable: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#cropperImageUpload") as HTMLElement;
    element.click()
  }

  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#cropperImageUpload + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
      var fileTypes = ['jpg', 'jpeg', 'png'];  //acceptable file types
      var extension = event.target.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
      isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
      if (isSuccess) { //yes
        // start file reader
        const reader = new FileReader();
        const angularCropper = this.angularCropper;
        reader.onload = (event) => {
          if(event.target.result) {
            angularCropper.imageUrl = event.target.result;
          }
        };
        reader.readAsDataURL(event.target.files[0]);
      } else { //no
        alert('Selected file is not an image. Please select an image file.')
      }
    }
  }

  cropImage() {
    this.resultImage = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
    let dwn: HTMLElement = document.querySelector('.download') as HTMLElement;
    dwn.setAttribute('href', this.resultImage);
  }

}
