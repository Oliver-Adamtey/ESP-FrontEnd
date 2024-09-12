import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { OrganizerDashboardService } from './organizer-dashboard.service';


describe('OrganizerDashboardService', () => {
  let service: OrganizerDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(OrganizerDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
