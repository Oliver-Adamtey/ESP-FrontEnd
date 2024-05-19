import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({

  providedIn: 'root'
})
export class CreateEventService {

  private createEventURL = environment.CREATE_EVENT_URL + '/' + sessionStorage.getItem('userId');

  constructor(private httpClient: HttpClient) {}

  createEvent(data: any): Observable<any> {
    const Token = sessionStorage.getItem(environment.ORGANIZER_TOKEN);

    if (!Token) {
      console.error('Token not found in session storage');

    }

    const headers = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${Token}`)


    return this.httpClient.post(this.createEventURL, data, { headers });
  }


}
