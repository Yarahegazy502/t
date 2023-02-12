import { TestBed } from '@angular/core/testing';

import { IndexationDataMasterService } from './indexation-data-master.service';

describe('IndexationDataMasterService', () => {
  let service: IndexationDataMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexationDataMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
