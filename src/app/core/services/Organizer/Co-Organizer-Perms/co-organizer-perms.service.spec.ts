import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CoOrganizerPermsService } from './co-organizer-perms.service';

describe('CoOrganizerPermsService', () => {
  let service: CoOrganizerPermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    service = TestBed.inject(CoOrganizerPermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
