import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CoOrganizer, CoOrganizerPermissionResponse, Permissions } from '../../../components/Dashboard/Organizer/users/permissions';
import { PermissionDateResponse } from './PermissionResponse';
@Injectable({
  providedIn: 'root'
})
export class CoOrganizerPermsService {
  baseUrl = environment.BASE_URL;
  userId = String(sessionStorage.getItem('userId'));


  constructor(private http: HttpClient) { }

  permission(): Observable<PermissionDateResponse> {
    return this.http.get<PermissionDateResponse>(`${this.baseUrl}/organizer/user-permissions?organizerId=${this.userId}`, {});
  }


  create(coOrgId: string, action: boolean): Observable<PermissionDateResponse> {
    return this.http.put<PermissionDateResponse>(`${this.baseUrl}/organizer/permission/${coOrgId}/create-events?canScheduleEvents=${action}`, {});

  }

  update(coOrgId: string, action: boolean): Observable<PermissionDateResponse> {
    return this.http.put<PermissionDateResponse>(`${this.baseUrl}/organizer/permission/${coOrgId}/edit-events?canEditEvents=${action}`, {});

  }

  delete(coOrgId: string, action: boolean): Observable<PermissionDateResponse> {
    return this.http.put<PermissionDateResponse>(`${this.baseUrl}/organizer/permission/${coOrgId}/delete-events?canDeleteEvents=${action}`, {});

  }

  invite(coOrgId: string, action: boolean): Observable<PermissionDateResponse> {
    return this.http.put<PermissionDateResponse>(`${this.baseUrl}/organizer/permission/${coOrgId}/invite-users?canInviteUsers=${action}`, {});
  }



}
