import { TestBed } from '@angular/core/testing';

import { SaveTripPlanService } from './save-trip-plan.service';

describe('SaveTripPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveTripPlanService = TestBed.get(SaveTripPlanService);
    expect(service).toBeTruthy();
  });
});
