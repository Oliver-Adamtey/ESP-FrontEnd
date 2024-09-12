import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { allEventdetails, AreaOfInterest, AttendeeProfile, FreeCheckoutData, registeredEvents, upcomingEvents, ViewEventdetails, allEventResponse, MeetingResponse } from '../../Interface/all-eventdetails/all-eventdetails';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AllUsersResponse } from '@interface/Admin/getAllUsers';
import { NotificationService } from '@notifications//notification.service';
import { EventMeetingUrl, EventObject } from '@interface/create-event/organizer';


@Injectable({
  providedIn: 'root'
})
export class GetEventService {

  token = sessionStorage.getItem('Token')
  profileSubject = new BehaviorSubject<AttendeeProfile | null>(null);
  httpClient: any;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  get profile$(): Observable<AttendeeProfile | null> {
    return this.profileSubject.asObservable();
  }

  getEvents(id: string, pageNumber?: number){
    let params = new HttpParams().set('id', id);

    if (pageNumber) {
      params = params.set('page', pageNumber.toString());
    }

    const url = `${environment.BASE_URL}/attendee/read-all/${id}`;

    return this.http.get<allEventResponse>(url, { params });
  }

  getEventsByLocationHome(location: string) {

    return this.http.get<allEventResponse>(`${environment.BASE_URL}/find-event/filters?venueLocation=${location}`);
  }

  getEventsByEventTitleHome(eventtitle: string) {

    return this.http.get<allEventResponse>(`${environment.BASE_URL}/find-event/filters?eventTitle=${eventtitle}`);
  }

  getEventsByCategoryHome(category: string){

    return this.http.get<allEventResponse>(`${environment.BASE_URL}/find-event/filters?eventCategory=${category}`);
  }



  getEventsByDate(dateRange:{startDate: string, endDate: string}) {
    const url = `${environment.BASE_URL}/find-event/filters?eventStartDate=${dateRange.startDate}&eventEndDate=${dateRange.endDate}`;

    return this.http.get<allEventResponse>(url, {})
  }
  
  getEventsByTicketStatusHome(status: string, pageNumber: number = 0){

    return this.http.get<allEventResponse>(
      `${environment.BASE_URL}/find-event/filters?ticketStatus=${status}`);
  }


  loadingUpcomingEvents(id: string) {

    const url = `${environment.BASE_URL}/attendee/upcoming-events/${id}`;

    return this.http.get<upcomingEvents[]>(url);
  }

  loadingPopularEvents() {
    const url = `${environment.BASE_URL}/attendee/popular-events`;
    return this.http.get<upcomingEvents[]>(url);
  }

  completeOnboarding(userId: string, selectedInterests: string[]) {


    const url = `${environment.BASE_URL}/attendee/${userId}/onboarding`;

    return this.http.post<AreaOfInterest>(url, { areasOfInterest: selectedInterests }).pipe(
      tap((response) => {
        if (response.status === 200) {
          sessionStorage.setItem('onboardingComplete', 'true');
        }
      }),
      catchError(this.handleError)
    );
  }

  getAttendeeProfile(id: string){
    const url = `${environment.BASE_URL}/shared/view-profile/${id}`;

    return this.http.get<{ data: AttendeeProfile }>(url);
  }

  updateAttendeeProfile(id: string, updatedProfile: Partial<AttendeeProfile>) {
    const url = `${environment.BASE_URL}/profile/create-attendee-profile`;
    return this.http.post<{ data: AttendeeProfile }>(url, updatedProfile)
      .pipe(
        catchError(error => {
          this.notificationService.showError('Error updating profile');
          return throwError(error);
        })
      );
  }

  setProfile(profile: AttendeeProfile) {
    this.profileSubject.next(profile);
  }

  loadUserProfile(userId: string) {
    this.getAttendeeProfile(userId).subscribe({
      next: (res) => {
        this.profileSubject.next(res.data);
      },
      error: (error) => {
        this.notificationService.showError('Error fetching profile');
      }
    });
  }


  getEventById(eventId: string) {
    const url = `${environment.BASE_URL}/attendee/read-event/${eventId}`;

    return this.http.get<ViewEventdetails>(url);
  }

  getNotifications(eventId: string) {
    const url = `${environment.BASE_URL}/attendee/read-event/${eventId}`;

    return this.http.get<any>(url);
  }

  eventMeetingLinks(eventId: string) {
    const url = `${environment.BASE_URL}/event-vista/start/${eventId}`;

    return this.http.post<ViewEventdetails>(url, {}).pipe(
      catchError(this.handleError)
    );
  }
  attendeeMeetingLinks(eventId: number): Observable<MeetingResponse> {
    const url = `${environment.BASE_URL}/attendee/join-meeting/${eventId}`;

    return this.http.get<MeetingResponse>(url, {})
  }

  getMyEventRegisteredById(eventId: string) {
    const url = `${environment.BASE_URL}/attendee/my-events/${eventId}`;

    return this.http.get<registeredEvents>(url).pipe(
      catchError(this.handleError)
    );
  }

  filterMyEvents(filterMyEventsValue: string | {eventStartDate: string, eventEndDate: string}) {
    const url = typeof filterMyEventsValue === "string"
      ? `${environment.BASE_URL}/attendee/my-events/filter?${filterMyEventsValue}`
      : `${environment.BASE_URL}/attendee/my-events/filter?${filterMyEventsValue.eventStartDate}&${filterMyEventsValue.eventEndDate}`;


    return this.http.get<registeredEvents>(url).pipe(
      tap(response => {
        
      })
    );
  }

  sendFreeCheckoutDetails(eventId: string, userId: string, infoData: FreeCheckoutData) {
    const url = `${environment.BASE_URL}/attendee/register-event/${userId}/${eventId}`;

    return this.http.post<AllUsersResponse>(url, infoData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.notificationService.showError('An error occurred');
    } else {
      this.notificationService.showError(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  eventMeetingLink(eventId: number): Observable<EventMeetingUrl> {
    const meetingUrl = `${environment.BASE_URL}/event-vista/start/${eventId}`;

    return this.http.post<EventMeetingUrl>(meetingUrl, {});

  }
}
