import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateEventService } from './create-event.service';

describe('CreateEventService', () => {
  let service: CreateEventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(CreateEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
