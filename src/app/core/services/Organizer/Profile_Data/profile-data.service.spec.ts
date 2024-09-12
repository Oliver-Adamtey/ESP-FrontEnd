import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProfileDataService } from './profile-data.service';

describe('ProfileDataService', () => {
  let service: ProfileDataService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ToastrService]
    });
    service = TestBed.inject(ProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
