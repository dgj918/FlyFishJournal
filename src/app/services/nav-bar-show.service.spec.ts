import { TestBed } from '@angular/core/testing';

import { NavBarShowService } from './nav-bar-show.service';

describe('NavBarShowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavBarShowService = TestBed.get(NavBarShowService);
    expect(service).toBeTruthy();
  });
});
