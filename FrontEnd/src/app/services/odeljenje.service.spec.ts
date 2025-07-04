import { TestBed } from '@angular/core/testing';

import { OdeljenjeService } from './odeljenje.service';

describe('OdeljenjeService', () => {
  let service: OdeljenjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdeljenjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
