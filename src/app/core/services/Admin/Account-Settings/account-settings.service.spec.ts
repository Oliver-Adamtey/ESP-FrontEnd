import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AccountSettingsService } from './account-settings.service';

describe('AccountSettingsService', () => {
  let service: AccountSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AccountSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
