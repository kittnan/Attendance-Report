import { TestBed } from '@angular/core/testing';

import { HttpRecordService } from './http-record.service';

describe('HttpRecordService', () => {
  let service: HttpRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
