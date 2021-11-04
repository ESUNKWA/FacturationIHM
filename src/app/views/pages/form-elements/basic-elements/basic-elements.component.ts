import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click()
  }

  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;
      element.setAttribute( 'value', fileName)
    }
  }

}
