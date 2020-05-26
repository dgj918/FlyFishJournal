import { TestBed } from '@angular/core/testing';

import { WaypointDataService } from './waypoint-data.service';

describe('WaypointDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaypointDataService = TestBed.get(WaypointDataService);
    expect(service).toBeTruthy();
  });
});
