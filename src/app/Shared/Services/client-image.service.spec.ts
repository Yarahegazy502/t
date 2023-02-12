import { TestBed } from '@angular/core/testing';

import { ClientImageService } from './client-image.service';

describe('ClientImageService', () => {
  let service: ClientImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
