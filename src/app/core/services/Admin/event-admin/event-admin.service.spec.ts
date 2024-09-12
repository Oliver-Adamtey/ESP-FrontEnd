import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventAdminService } from './event-admin.service';
import { environment } from '@environments/environment';
import { allEventResponse, viewEventdetails  } from '@interface/all-eventdetails/all-eventdetails';
import {adminAllEventResponse} from '@interface/Admin/getAllUsers'

describe('EventAdminService', () => {
  let service: EventAdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[EventAdminService]
    });
    service = TestBed.inject(EventAdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve events with an optional page number', () => {
    const eventResponse:adminAllEventResponse = {
      content: [],
      empty: false,
      first: false,
      last: false,
      number: 0,
      numberOfElements: 0,
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: {
          sorted: false,
          empty: false,
          unsorted: false
        },
        offset: 0,
        paged: false,
        unpaged: false
      }
      
    }

    const id = 'event123';
    service.getEvents(id, 1).subscribe((response) => {
      expect(response).toEqual(eventResponse);
    })

    const req = httpMock.expectOne(`${environment.BASE_URL}/admin/read-all-admin/${id}?id=event123&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(eventResponse);
  })

  it('should retrieve events by location with a default page number', () => {
    const pageNumber: allEventResponse = {
      content: [],
      empty: false,
      first: false,
      last: false,
      number: 0,
      numberOfElements: 0,
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: {
          sorted: false,
          empty: false,
          unsorted: false
        },
        offset: 0,
        paged: false,
        unpaged: false
      }
    }

    const location = 'New York';

    service.getEventsByLocation(location).subscribe((response) => {
      expect(response).toEqual(pageNumber);
    });

    const req = httpMock.expectOne(`${environment.BASE_URL}/admin/filters?venueLocation=${location}`);
    expect(req.request.method).toBe('GET');
    req.flush(pageNumber);
  })

  it('should retrievet an admin by ID', () => {
    const adminID: viewEventdetails = {
      organizerFullName: '',
      organizerEmail: '',
      locationId: 0,
      eventId: 0,
      eventTitle: '',
      eventCategory: '',
      eventType: '',
      moderatorMeeetingLink: '',
      attendeeInviteLink: '',
      eventStartDate: '',
      eventEndDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventImageUrl: '',
      eventSummary: '',
      eventPrice: 0,
      ticketType: '',
      ticketStatus: '',
      ticketTiers: [],
      ticketQuantity: 0,
      tags: [],
      venueLocation: '',
      venueAddress1: '',
      venueAddress2: '',
      city: '',
      stateProvinceRegion: '',
      country: '',
      venueLayoutUrl: '',
      seatingTypeUrl: '',
      organizerLogo: '',
      scheduleDate: '',
      scheduleTime: '',
      profileImageUrl: '',
      attendeeImages: []
    }

    const eventId = 'event456';

    service.getAdminEventById(eventId).subscribe((response) => {
      expect(response).toEqual(adminID);
    });

    const req = httpMock.expectOne(`${environment.BASE_URL}/admin/event-details/${eventId}`);
    expect(req.request.method).toBe('GET');
    req.flush(adminID);
  })
});
