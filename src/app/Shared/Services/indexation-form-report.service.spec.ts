import { TestBed } from '@angular/core/testing';

import { IndexationFormReportService } from './indexation-form-report.service';

describe('IndexationFormReportService', () => {
  let service: IndexationFormReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexationFormReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
