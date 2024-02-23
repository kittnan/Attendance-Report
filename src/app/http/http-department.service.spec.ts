import { TestBed } from '@angular/core/testing';

import { HttpDepartmentService } from './http-department.service';

describe('HttpDepartmentService', () => {
  let service: HttpDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
