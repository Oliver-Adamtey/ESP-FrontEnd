import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ForgotpasswordService } from './forgotpassword.service';
import { ToastrService } from 'ngx-toastr';

describe('ForgotpasswordService', () => {
  let service: ForgotpasswordService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(ForgotpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
