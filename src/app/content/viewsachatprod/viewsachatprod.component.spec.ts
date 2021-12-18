import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsachatprodComponent } from './viewsachatprod.component';

describe('ViewsachatprodComponent', () => {
  let component: ViewsachatprodComponent;
  let fixture: ComponentFixture<ViewsachatprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsachatprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsachatprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
