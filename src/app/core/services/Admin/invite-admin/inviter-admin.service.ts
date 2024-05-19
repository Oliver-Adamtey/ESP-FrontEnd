import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InviterAdminService {

  constructor(private httpClient: HttpClient) { }



  private inviteApi = environment.SEND_ADMIN_INVITE;

  admin(data: any): Observable<any> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', 'Content-Type')

    return this.httpClient.post<any>(this.inviteApi, data, {headers})
  }
}
