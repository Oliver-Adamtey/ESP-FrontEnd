import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrganizationBusinessInfoService } from './organization-business-info.service';

describe('OrganizationBusinessInfoService', () => {
  let service: OrganizationBusinessInfoService;
  let httpMock: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(OrganizationBusinessInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
