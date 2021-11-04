import { TestBed } from '@angular/core/testing';

import { UserInfosService } from './user-infos.service';

describe('UserInfosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserInfosService = TestBed.get(UserInfosService);
    expect(service).toBeTruthy();
  });
});
