import { TestBed } from '@angular/core/testing';

import { OpwService } from './opw.service';

describe('OpwService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpwService = TestBed.get(OpwService);
    expect(service).toBeTruthy();
  });
});
