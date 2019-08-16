import { TestBed } from '@angular/core/testing';

import { WaypointsService } from './waypoints.service';

describe('WaypointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaypointsService = TestBed.get(WaypointsService);
    expect(service).toBeTruthy();
  });
});
