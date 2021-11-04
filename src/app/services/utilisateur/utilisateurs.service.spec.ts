import { TestBed } from '@angular/core/testing';

import { UtilisateursService } from './utilisateurs.service';

describe('UtilisateursService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilisateursService = TestBed.get(UtilisateursService);
    expect(service).toBeTruthy();
  });
});
