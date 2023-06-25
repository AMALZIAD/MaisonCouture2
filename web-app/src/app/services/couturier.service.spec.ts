import { TestBed } from '@angular/core/testing';

import { CouturierService } from './couturier.service';

describe('CouturierService', () => {
  let service: CouturierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouturierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
