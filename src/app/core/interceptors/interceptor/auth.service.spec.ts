import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptor } from './auth.service';

describe('AuthService', () => {
  let service = authInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, authInterceptor]
    });
    service = TestBed.inject(authInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
