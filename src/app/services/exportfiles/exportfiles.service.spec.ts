import { TestBed } from '@angular/core/testing';

import { ExportfilesService } from './exportfiles.service';

describe('ExportfilesService', () => {
  let service: ExportfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
