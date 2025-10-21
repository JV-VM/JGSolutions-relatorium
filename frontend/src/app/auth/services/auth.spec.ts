import { TestBed } from '@angular/core/testing';

import { AuthLocalService } from './auth-local';

describe('AuthService', () => {
  let service: AuthLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
