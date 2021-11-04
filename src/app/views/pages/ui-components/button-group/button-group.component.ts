import { Component, OnInit } from '@angular/core';

const defaultButtonGroup = {
  htmlCode: 
`<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {}`
}

const buttonToolbar = {
  htmlCode: 
`<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group mr-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-primary">1</button>
    <button type="button" class="btn btn-primary">2</button>
    <button type="button" class="btn btn-primary">3</button>
    <button type="button" class="btn btn-primary">4</button>
  </div>
  <div class="btn-group mr-2" role="group" aria-label="Second group">
    <button type="button" class="btn btn-primary">5</button>
    <button type="button" class="btn btn-primary">6</button>
    <button type="button" class="btn btn-primary">7</button>
  </div>
  <div class="btn-group" role="group" aria-label="Third group">
    <button type="button" class="btn btn-primary">8</button>
  </div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {}`
}

const mixedToolbar = {
  htmlCode: 
`<div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group mr-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-primary">1</button>
     ..
  </div>
  <div class="input-group">
    <div class="input-group-prepend">
      <div class="input-group-text" id="btnGroupAddon">@</div>
    </div>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">
  </div>
</div>
<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group" role="group" aria-label="First group">
    <button type="button" class="btn btn-primary">1</button>
     ...
  </div>
  <div class="input-group">
    <div class="input-group-prepend">
      <div class="input-group-text" id="btnGroupAddon2">@</div>
    </div>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2">
  </div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {}`
}

const buttonGroupSizing = {
  htmlCode: 
`<div class="btn-group btn-group-lg" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {}`
}

const buttonGroupNesting = {
  htmlCode: 
`<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
  <button type="button" class="btn btn-primary">1</button>
  <button type="button" class="btn btn-primary">2</button>

  <div class="btn-group" role="group" ngbDropdown>
    <button id="btnGroupDrop1" type="button" ngbDropdownToggle class="btn btn-primary">
      Dropdown
    </button>
    <div ngbDropdownMenu aria-labelledby="btnGroupDrop1">
      <a ngbDropdownItem href="" (click)="false">Dropdown link</a>
      <a ngbDropdownItem href="" (click)="false">Dropdown link</a>
    </div>
  </div>
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {}`
}

const verticalVariation = {
  htmlCode: 
`<div class="btn-group-vertical">
  <button type="button" class="btn btn-secondary">Button</button>
  ...
  ...
</div>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html'
})
export class ButtonGroupComponent {}`
}

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  preserveWhitespaces: true
})
export class ButtonGroupComponent implements OnInit {

  defaultButtonGroupCode: any;
  buttonToolbarCode: any;
  mixedToolbarCode: any;
  buttonGroupSizingCode: any;
  buttonGroupNestingCode: any;
  verticalVariationCode: any;

  constructor() { }

  ngOnInit(): void {
    this.defaultButtonGroupCode = defaultButtonGroup;
    this.buttonToolbarCode = buttonToolbar;
    this.mixedToolbarCode = mixedToolbar;
    this.buttonGroupSizingCode = buttonGroupSizing;
    this.buttonGroupNestingCode = buttonGroupNesting;
    this.verticalVariationCode = verticalVariation;
  }

  scrollTo(element: any) {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
