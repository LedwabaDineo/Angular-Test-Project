import { TestBed } from '@angular/core/testing';

import { PersonalDetailsService } from './personal-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('PersonalDetailsService', () => {
  let service: PersonalDetailsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
    });
    service = TestBed.inject(PersonalDetailsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
