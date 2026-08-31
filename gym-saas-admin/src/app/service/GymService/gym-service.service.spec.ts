import { TestBed } from '@angular/core/testing';

import { GymServiceService } from './gym-service.service';

describe('GymServiceService', () => {
  let service: GymServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
