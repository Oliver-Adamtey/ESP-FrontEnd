import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { OrganizerEventsService } from '@services/Organizer/organizer-events/organizer-events.service';

describe('OrganizerEventsService', () => {
  let service: OrganizerEventsService;
  let toasterService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    service = TestBed.inject(OrganizerEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
