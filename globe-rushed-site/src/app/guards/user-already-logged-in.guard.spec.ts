import { TestBed } from '@angular/core/testing';

import { UserAlreadyLoggedInGuard } from './user-already-logged-in.guard';

describe('UserAlreadyLoggedInGuard', () => {
  let guard: UserAlreadyLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAlreadyLoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
