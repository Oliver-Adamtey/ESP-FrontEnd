import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InviteUserRequest, InviteUserResponse } from '@interface/Organizer/user-invite';
import { PageDataResponse } from '@interface/registration/login-register';

@Injectable({
  providedIn: 'root'
})
export class InviteUserService {
  constructor(private httpClient: HttpClient) { }



  private orgInvite = `${environment.ORG_USER_INVITE}/${sessionStorage.getItem('userId')}`;
  private orgUsersByStatus = `${environment.ORG_USER_BY_STATUS}/${sessionStorage.getItem('userId')}`;

  organizer(data: InviteUserRequest): Observable<InviteUserResponse> {

    return this.httpClient.post<InviteUserResponse>(this.orgInvite, data);
  }


  getUsersByStatusAndSearch(status?: string, search?: string): Observable<PageDataResponse> {

    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }
    if (search) {
      params = params.set('search', search);
    }

    return this.httpClient.get<PageDataResponse>(this.orgUsersByStatus, {params});
  
  }








}
