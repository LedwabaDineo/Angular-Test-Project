import { TestBed } from '@angular/core/testing';

import { RegistrationService } from './registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(RegistrationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
