import { TestBed } from '@angular/core/testing';

import { SifarnikServiceMock } from './sifarnikMock.service';

describe('SifarnikService', () => {
  let service: SifarnikServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SifarnikServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
