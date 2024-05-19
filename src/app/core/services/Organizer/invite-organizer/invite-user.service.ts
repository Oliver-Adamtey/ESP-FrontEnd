import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InviteUserService {
  constructor(private httpClient: HttpClient) { }



  private loginApi = environment.ORG_INVITE;

  organizer(data: any): Observable<any> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', 'Content-Type')

    return this.httpClient.post<any>(this.loginApi, data, {headers})
  }
}
