import { TestBed } from '@angular/core/testing';

import { UserLocalDB } from './user-local';

describe('UserLocal', () => {
  let service: UserLocalDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLocalDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
