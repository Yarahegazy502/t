import { TestBed } from '@angular/core/testing';

import { SiteItemService } from './site-item.service';

describe('SiteItemService', () => {
  let service: SiteItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
