import { TestBed } from '@angular/core/testing';

import { Soil } from './soil';

describe('Soil', () => {
  let service: Soil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Soil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
