import { Component, OnInit } from '@angular/core';

const defaultBadge = {
  htmlCode: 
`<h1>Example heading <span class="badge badge-primary">New</span></h1>
<h2>Example heading <span class="badge badge-primary">New</span></h2>
<h3>Example heading <span class="badge badge-primary">New</span></h3>
<h4>Example heading <span class="badge badge-primary">New</span></h4>
<h5>Example heading <span class="badge badge-primary">New</span></h5>
<h6>Example heading <span class="badge badge-primary">New</span></h6>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html'
})
export class BadgesComponent {}`
}

const buttonBadge = {
  htmlCode: 
`<button type="button" class="btn btn-primary">
  Notifications <span class="badge badge-light">4</span>
</button>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html'
})
export class BadgesComponent {}`
}

const contextualVariations = {
  htmlCode: 
`<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-light">Light</span>
<span class="badge badge-dark">Dark</span>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html'
})
export class BadgesComponent {}`
}

const pillBadge = {
  htmlCode: 
`<span class="badge badge-pill badge-primary">Primary</span>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html'
})
export class BadgesComponent {}`
}

const linkBadge = {
  htmlCode: 
`<a href="" (click)="false" class="badge badge-primary">Primary</a>`,
  tsCode: 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html'
})
export class BadgesComponent {}`
}

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  preserveWhitespaces: true
})
export class BadgesComponent implements OnInit {

  defaultBadgeCode: any;
  buttonBadgeCode: any;
  contextualVariationsCode: any;
  pillBadgeCode: any;
  linkBadgeCode: any;

  constructor() { }

  ngOnInit(): void {
    this.defaultBadgeCode = defaultBadge;
    this.buttonBadgeCode = buttonBadge;
    this.contextualVariationsCode = contextualVariations;
    this.pillBadgeCode = pillBadge;
    this.linkBadgeCode = linkBadge;
  }

  scrollTo(element: any) {
    element.scrollIntoView({behavior: 'smooth'});
  }

}
