import { TestBed } from '@angular/core/testing';

import { SuiviventescmdService } from './suiviventescmd.service';

describe('SuiviventescmdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuiviventescmdService = TestBed.get(SuiviventescmdService);
    expect(service).toBeTruthy();
  });
});
