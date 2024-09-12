import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InviterAdminService } from './inviter-admin.service';

describe('InviterAdminService', () => {
  let service: InviterAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(InviterAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
