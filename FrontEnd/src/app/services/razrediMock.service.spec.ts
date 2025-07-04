import { TestBed } from '@angular/core/testing';

import { RazrediServiceMock } from './razrediMock.service';

describe('RazrediService', () => {
  let service: RazrediServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazrediServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
