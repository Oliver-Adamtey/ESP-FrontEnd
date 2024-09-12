import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivateAccountResponse } from '@interface/Organizer/activate';
import { PageResponse } from '@interface/registration/login-register';

@Injectable({
  providedIn: 'root'
})
export class ActivateCoOrgService {

  private orgActivate: string;
  private orgdeActivate: string;
  private orgDelete: string;

  constructor(private httpClient: HttpClient) {
    this.orgActivate = `${environment.ORG_ACTIVATE}/`;
    this.orgdeActivate = `${environment.ORG_DEACTIVATE}/`;
    this.orgDelete = `${environment.ORG_DELETE}/`;
  }

  activateAccount(itemId: string): Observable<PageResponse> {
    return this.httpClient.patch<PageResponse>(this.orgActivate+itemId,{});
  }

  dectivateAccount(itemId: string): Observable<PageResponse> {
    return this.httpClient.patch<PageResponse>(this.orgdeActivate+itemId, {});
  }

  deleteAccount(itemId: string): Observable<PageResponse> {
    return this.httpClient.delete<PageResponse>(this.orgDelete + itemId );
  }

}
