import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from '@services/Admin/admin-dashboard/admin.service';
import { Analytics } from '@interface/Admin/admin-analytics';
import { environment } from '@environments/environment';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController :HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch analytics data from the API', () => {
    const statisticsData: Analytics = {
      totalEventsCreated: 100,
      totalTicketsEverSold: 200,
      allRevenueMade: 30000,
      currentYearData: {
        attendees: {
          January: 50,
          February: 60,
          March: 70,
          April: 80,
          May: 90,
          June: 100,
          July: 110,
          August: 120,
          September: 130,
          October: 140,
          November: 150,
          December: 160,
        },
        organizers: {
          January: 10,
          February: 20,
          March: 30,
          April: 40,
          May: 50,
          June: 60,
          July: 70,
          August: 80,
          September: 90,
          October: 100,
          November: 110,
          December: 120,
        },
      },
      numberOfAllUsers: 0,
      regularUsers: 0,
      numberOfAttendees: 0,
      numberOfOrganizers: 0,
      numberOfRegisteredAttendeesInCurrentMonth: 0,
      numberOfRegisteredOrganizersInCurrentMonth: 0,
      totalOrganizersActive: 0,
      totalAttendeesActive: 0,
      sumOfAttendeesAndOrganizers: 0,
      attendeePercentage: 0,
      organizerPercentage: 0,
      allAllocatedTickets: 0,
      percentageSold: 0,
      dailySoldTickets: 0
    };

    service.getAnalytics().subscribe((data) => {
      expect(data).toEqual(statisticsData);
    });

    const req = httpTestingController.expectOne(environment.ANALYTICS_URL);

    expect(req.request.method).toBe('GET');

    req.flush(statisticsData); 
  });
});
