import { TestBed } from '@angular/core/testing';

import { CounsellorMyProfileService } from './counsellor-my-profile.service';

describe('CounsellorMyProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounsellorMyProfileService = TestBed.get(CounsellorMyProfileService);
    expect(service).toBeTruthy();
  });
});
