import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupResponse, signupForm } from '../../components/Interface/registration/signup';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService  {

  private signupUrl = environment.SIGN_UP_URL;

  constructor(private httpClient: HttpClient) {}

  signup(data: signupForm): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', 'Content-Type');

    return this.httpClient.post<SignupResponse>(this.signupUrl, data, { headers });
  }


}
