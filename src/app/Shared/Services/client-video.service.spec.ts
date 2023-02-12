import { TestBed } from '@angular/core/testing';

import { ClientVideoService } from './client-video.service';

describe('ClientVideoService', () => {
  let service: ClientVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
