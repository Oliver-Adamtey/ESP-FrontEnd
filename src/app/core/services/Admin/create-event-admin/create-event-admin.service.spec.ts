import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CreateEventAdminService } from './create-event-admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateEventAdminService', () => {
  let service: CreateEventAdminService;
  let mockHttp:HttpClientTestingModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(CreateEventAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
