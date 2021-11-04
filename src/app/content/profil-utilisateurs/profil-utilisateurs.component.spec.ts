import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUtilisateursComponent } from './profil-utilisateurs.component';

describe('ProfilUtilisateursComponent', () => {
  let component: ProfilUtilisateursComponent;
  let fixture: ComponentFixture<ProfilUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
