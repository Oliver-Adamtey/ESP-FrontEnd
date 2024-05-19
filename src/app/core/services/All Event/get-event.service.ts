import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetEventService {
  private getAllEventsUrl = environment.GET_ALL_EVENTS;

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<any> {
    const authToken = localStorage.getItem('authToken');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${authToken}`);

    return this.httpClient.get(this.getAllEventsUrl, { headers });
  }

}



