import { TestBed } from '@angular/core/testing';

import { RequiredOutputService } from './required-output.service';

describe('RequiredOutputService', () => {
  let service: RequiredOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequiredOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
