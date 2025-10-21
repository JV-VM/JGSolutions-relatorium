import { TestBed } from '@angular/core/testing';

import { Pest } from './pest';

describe('Pest', () => {
  let service: Pest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
