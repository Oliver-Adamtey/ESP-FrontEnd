import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AllUsersEvent } from '@interface/Admin/getAllUsers';
import { Co_Organizer } from '@interface/Organizer-filtering/records';
import { PageDataResponse, PageResponse } from '@interface/registration/login-register';
import { Observable } from 'rxjs';
import { PageableResponse, PageableResponseAttendee } from '@interface/create-event/organizer';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private httpClient: HttpClient) { }
   userId = sessionStorage.getItem(environment.USER_ID);
   baseUrl = environment.GET_ALL_USERS_ORG;


  public getCoOrganizers(pageNumber: number, pageSize: number)  {
    const params = new HttpParams()
    .set('page', pageNumber.toString())
    .set('size', pageSize.toString());
    return this.httpClient.get<PageDataResponse>(
      this.baseUrl + `/${this.userId}`,
      { params}
    );
}


private orgEventsFiltering = `${environment.ORG_EVENTS_FILTERING}/${sessionStorage.getItem('userId')}`;

public getEventsByFiltering( currentPage: number, pageSize: number , search?: string, category?: string,status?: string): Observable<PageableResponse> {

  let params = new HttpParams()
  .set('page', currentPage.toString())
  .set('size', pageSize.toString());

  if (status) {
    params = params.set('ticketStatus', status);
  }
  if (search) {
    params = params.set('eventTitle', search);
  }
  if (category) {
    params = params.set('eventCategory', category);
  }

  return this.httpClient.get<PageableResponse>(this.orgEventsFiltering , {params});


}

private orgEventsSearchAttendees= `${environment.ORG_EVENTS_SEARCH_ATTENDEES}/`;

public getEventsAttendees(eventId:number, currentPage: number, pageSize: number , keyword?: string, gender?: string,): Observable<PageableResponseAttendee> {

  let params = new HttpParams()
  .set('page', currentPage.toString())
  .set('size', pageSize.toString());


  if (keyword) {
    params = params.set('keyword', keyword);
  }
  if (gender) {
    params = params.set('gender', gender);
  }

  return this.httpClient.get<PageableResponseAttendee>(this.orgEventsSearchAttendees +eventId, {params});


}

}
