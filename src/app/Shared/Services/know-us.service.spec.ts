import { TestBed } from '@angular/core/testing';

import { KnowUsService } from './know-us.service';

describe('KnowUsService', () => {
  let service: KnowUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
