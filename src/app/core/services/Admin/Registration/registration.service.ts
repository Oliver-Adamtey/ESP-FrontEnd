import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { signupForm, SignupResponse } from '../../../components/Interface/registration/signup';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private signupUrl = environment.CREATE_ADMIN;

  constructor(private httpClient: HttpClient) {}

  signup(data: signupForm): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', 'Content-Type');

    return this.httpClient.post<SignupResponse>(this.signupUrl, data, { headers });
  }



}
