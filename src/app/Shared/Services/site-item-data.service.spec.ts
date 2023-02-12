import { TestBed } from '@angular/core/testing';

import { SiteItemDataService } from './site-item-data.service';

describe('SiteItemDataService', () => {
  let service: SiteItemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteItemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
