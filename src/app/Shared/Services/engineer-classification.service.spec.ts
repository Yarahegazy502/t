import { TestBed } from '@angular/core/testing';

import { EngineerClassificationService } from './engineer-classification.service';

describe('EngineerClassificationService', () => {
  let service: EngineerClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineerClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
