import { TestBed } from '@angular/core/testing';

import { Fertilization } from './fertilization';

describe('Fertilization', () => {
  let service: Fertilization;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fertilization);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
