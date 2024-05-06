import { TestBed } from '@angular/core/testing';

import { GetFrameScheduleService } from './get-frame-schedule.service';

describe('GetFrameScheduleService', () => {
  let service: GetFrameScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFrameScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
