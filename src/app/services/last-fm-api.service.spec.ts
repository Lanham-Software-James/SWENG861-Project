import { TestBed } from '@angular/core/testing';

import { LastFmApiService } from './last-fm-api.service';

describe('LastFmApiService', () => {
  let service: LastFmApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastFmApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
