import { TestBed } from '@angular/core/testing';

import { YearsOfExperienceService } from './years-of-experience.service';

describe('YearsOfExperienceService', () => {
  let service: YearsOfExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearsOfExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
