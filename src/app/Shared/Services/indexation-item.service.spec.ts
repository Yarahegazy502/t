import { TestBed } from '@angular/core/testing';

import { IndexationItemService } from './indexation-item.service';

describe('IndexationItemService', () => {
  let service: IndexationItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexationItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
