import { TestBed } from '@angular/core/testing';

import { AccountSettingsImageProcessingService } from './account-settings-image-processing.service';

describe('AccountSettingsImageProcessingService', () => {
  let service: AccountSettingsImageProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSettingsImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
