import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthServicesService } from './auth-services.service';

describe('AuthServicesService', () => {
  let service: AuthServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
