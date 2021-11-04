import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsventesComponent } from './detailsventes.component';

describe('DetailsventesComponent', () => {
  let component: DetailsventesComponent;
  let fixture: ComponentFixture<DetailsventesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsventesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsventesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
