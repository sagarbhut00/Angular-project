import { TestBed } from '@angular/core/testing';

import { ApputilityService } from './apputility.service';

describe('ApputilityService', () => {
  let service: ApputilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApputilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
