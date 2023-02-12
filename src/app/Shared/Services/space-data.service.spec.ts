import { TestBed } from '@angular/core/testing';

import { SpaceDataService } from './space-data.service';

describe('SpaceDataService', () => {
  let service: SpaceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
