import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private httpClient: HttpClient) { }



  private loginApi = environment.ORG_SETTINGS;

  orgSettings_(data: any): Observable<any> {

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', 'Content-Type')

    return this.httpClient.post<any>(this.loginApi, data, {headers})
  }



}
