import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { InviteUserService } from './invite-user.service';

describe('InviteUserService', () => {
  let service: InviteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule]
    });
    service = TestBed.inject(InviteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
