import { TestBed } from '@angular/core/testing';

import { CitizenGuard } from './citizen.guard';

describe('CitizenGuard', () => {
  let guard: CitizenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CitizenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
