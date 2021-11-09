import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() isloader;
  isLoading: boolean;
  constructor() { }

  ngOnInit() {
    this.isLoading = this.isloader;

    console.log(this.isLoading);

  }

}
