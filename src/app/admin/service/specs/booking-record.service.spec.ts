import { TestBed } from '@angular/core/testing';

import { BookingRecordService } from '../booking-record.service';

describe('BookingRecordService', () => {
  let service: BookingRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
