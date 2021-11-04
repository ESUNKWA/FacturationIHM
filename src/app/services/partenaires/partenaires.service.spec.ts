import { TestBed } from '@angular/core/testing';

import { PartenairesService } from './partenaires.service';

describe('PartenairesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartenairesService = TestBed.get(PartenairesService);
    expect(service).toBeTruthy();
  });
});
