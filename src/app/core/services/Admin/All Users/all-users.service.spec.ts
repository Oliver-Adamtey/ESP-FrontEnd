import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AllUsersService } from './all-users.service';
import { AllUsersResponse, AttendeesResponse, OrganizerProfileInformation } from '@interface/Admin/getAllUsers';
import { environment } from '@environments/environment';

describe('AllUsersService', () => {
  let service: AllUsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AllUsersService]
    });
    service = TestBed.inject(AllUsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrieve all the users with pagination', () => {
    const UsersResponse: AllUsersResponse = {
      message: '',
      statusCode: 0,
      data: {
        content: [],
        totalElements: 0,
        totalPages: 0,
        statusText: ''
      }
    }

    service.getAll(1,10).subscribe((response) => {
      expect(response).toEqual(UsersResponse);
    })

    const req = httpMock.expectOne(`${environment.BASE_URL}/admin/all-users?page=1&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(UsersResponse);
  });

  it('should retrieve atttendees by eventID with paginations', () => {
    const AttendeesResponse: AttendeesResponse = {
      content: [],
      last: true,
      totalElements: 0,
      totalPages: 0,
      size: 10,
      number: 0,
      sort: {
        empty: true,
        sorted: true,
        unsorted: true
      },
      first: true,
      numberOfElements: 0,
      empty: true,
      Pageable: {
        pageNumber: 0,
        pageSize: 10,
        sort: {
          empty: true,
          sorted: true,
          unsorted: true
        },
        offset: 0,
        paged: true,
        unpaged: true
      }
    }
    service.getAdminViewAttendeesByEventId('event123', 1,10).subscribe((response) => {
      expect(response).toEqual(AttendeesResponse);
    })

    const req = httpMock.expectOne(`${environment.BASE_URL}/admin/attendees-registered/event123?page=1&size=10`);
    expect(req.request.method).toBe('GET');
    req.flush(AttendeesResponse);
  })

  it('should approve organizer', () => {
    const approveOrganizer:OrganizerProfileInformation = {
      statusCode: 0,
      message: '',
      status: 0,
      data: {
        approvalStatus: '',
        userId: '',
        description: '',
        organizationCertificate: '',
        organizationEmailAddress: '',
        organizationLogo: '',
        organizationName: '',
        organizationWebsite: '',
        statusText: ''
      }
    }
    service.approveOrganizer('user123').subscribe((response) => {
      expect(response).toEqual(approveOrganizer);
      expect(localStorage.getItem('approvalStatus_user123')).toBe(null)
    })

    const req = httpMock.expectOne(`${environment.BASE_URL}/admin/approve-organizer?organizerId=user123`);
    expect(req.request.method).toBe('POST');
    req.flush(approveOrganizer);
  })

  it('should decline organizer', () => {
    const declineOrganizer: OrganizerProfileInformation = {
      statusCode: 0,
      message: '',
      status: 0,
      data: {
        approvalStatus: '',
        userId: '',
        description: '',
        organizationCertificate: '',
        organizationEmailAddress: '',
        organizationLogo: '',
        organizationName: '',
        organizationWebsite: '',
        statusText: ''
      }
    }
    service.declineOrganizer('user123').subscribe((response) => {
      expect(response).toEqual(declineOrganizer);
      expect(localStorage.getItem('approvalStatus_user123')).toBe(null)
    })

    const req = httpMock.expectOne(`${environment.BASE_URL}/admin/decline-organizer?organizerId=user123`);
    expect(req.request.method).toBe('POST');
    req.flush(declineOrganizer);
  })
 
});
