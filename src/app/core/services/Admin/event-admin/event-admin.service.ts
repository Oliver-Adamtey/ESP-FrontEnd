import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { allEventdetails, ViewEventdetails, allEventResponse } from '../../../Interface/all-eventdetails/all-eventdetails';
import { adminAllEventResponse } from '../../../Interface/Admin/getAllUsers';

@Injectable({
  providedIn: 'root'
})
export class EventAdminService {

  token = sessionStorage.getItem('Token')

  constructor(private http: HttpClient) {}

  getEvents(id: string, pageNumber?: number, pageSize?: number)  {
      let params = new HttpParams();

      if (pageNumber) {
        params = params.set('page', pageNumber);
      }
      if (pageSize) {
        params = params.set('size', pageSize);
      }

    const url = `${environment.BASE_URL}/admin/read-all-admin/${id}`;
    return this.http.get<adminAllEventResponse>(url, { params });
  }

  getEventsByTicketStatus(status: string, pageNumber: number, pageSize?: number){
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('page', pageNumber);
    }
    if (pageSize) {
      params = params.set('size', pageSize);
    }
    return this.http.get<allEventResponse>(
      `${environment.BASE_URL}/admin/filters?ticketStatus=${status}`, { params });
  }

  getEventsByLocation(location: string, pageNumber: number, pageSize?: number){
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('page', pageNumber);
    }
    if (pageSize) {
      params = params.set('size', pageSize);
    }
    return this.http.get<allEventResponse>(
      `${environment.BASE_URL}/admin/filters?venueLocation=${location}`, { params });
  }

  getAdminEventById(eventId: string) {

    const url = `${environment.BASE_URL}/admin/event-details/${eventId}`;

    return this.http.get<ViewEventdetails>(url, );
  }

}
