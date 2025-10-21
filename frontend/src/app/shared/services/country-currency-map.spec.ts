import { TestBed } from '@angular/core/testing';

import { CountryCurrencyMap } from './country-currency-map';

describe('CountryCurrencyMap', () => {
  let service: CountryCurrencyMap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryCurrencyMap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
