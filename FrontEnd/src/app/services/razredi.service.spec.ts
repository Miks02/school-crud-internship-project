import { TestBed } from '@angular/core/testing';

import { RazrediService } from './razredi.service';

describe('RazrediService', () => {
  let service: RazrediService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazrediService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
