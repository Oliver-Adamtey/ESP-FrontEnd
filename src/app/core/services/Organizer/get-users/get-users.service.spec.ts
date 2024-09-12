import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { GetUsersService } from './get-users.service';

describe('GetUsersService', () => {
  let service: GetUsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(GetUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
