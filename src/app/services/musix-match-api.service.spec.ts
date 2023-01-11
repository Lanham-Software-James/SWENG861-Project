import { TestBed } from '@angular/core/testing';

import { MusixMatchApiService } from './musix-match-api.service';

describe('MusixMatchApiService', () => {
  let service: MusixMatchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusixMatchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
