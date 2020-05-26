import { TestBed } from '@angular/core/testing';

import { AddFishService } from './add-fish.service';

describe('AddFishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddFishService = TestBed.get(AddFishService);
    expect(service).toBeTruthy();
  });
});
