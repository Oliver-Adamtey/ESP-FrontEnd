import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserPermissionService } from './user-permission.service';

describe('UserPermissionService', () => {
  let service: UserPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(UserPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
