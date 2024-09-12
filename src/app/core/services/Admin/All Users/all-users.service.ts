import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Token } from '@angular/compiler';
import { AdminProfile, AdminViewAttendeesByE, AllUsersEvent, AllUsersResponse, AttendeesResponse, InviteData, OrganizerProfileInformation } from '../../../Interface/Admin/getAllUsers';
import { CoAdminPermissions, CoAdminPermissionsResponse } from '../../../Interface/Admin/permission';

@Injectable({
  providedIn: 'root'
})
export class AllUsersService {

  token = localStorage.getItem('Token')
  profileSubject = new BehaviorSubject<AdminProfile | null>(null);
  constructor(private http: HttpClient) {}

  get profile$(): Observable<AdminProfile | null> {
    return this.profileSubject.asObservable();
  }
  
  getAll(pageNumber: number, pageSize: number) {
      const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());
    const url = `${environment.BASE_URL}/admin/all-users`;

    return this.http.get<AllUsersResponse>(url, { params });
  }

  getAllCoAdminPermission(userId: number, pageNumber: number, pageSize: number, search?: string) {
    let params = new HttpParams()
      .set('page', pageNumber)
      .set('size', pageSize);
      if (search) {
        params = params.set('keyword', search);
      }
    const url = `${environment.BASE_URL}/admin/co-admin-permissions/${userId}`;
    return this.http.get<CoAdminPermissionsResponse>(url, { params });
  }

  setCanViewUsers(userId: number, canViewUsers: boolean) {
    const url = `${environment.BASE_URL}/admin/permissions/can-view-users/${userId}?canViewUsers=${canViewUsers}`;
    return this.http.patch<CoAdminPermissionsResponse>(url, {});
  }

  setCanDeleteUsers(userId: number, canDeleteUsers: boolean) {
    const url = `${environment.BASE_URL}/admin/permissions/can-delete-users/${userId}?canDeleteUsers=${canDeleteUsers}`;
    return this.http.patch<CoAdminPermissionsResponse>(url, {});
  }

  setCanViewAttendees(userId: number, canViewAttendees: boolean) {
    const url = `${environment.BASE_URL}/admin/permissions/can-view-attendees/${userId}?canViewAttendees=${canViewAttendees}`;
    return this.http.patch<CoAdminPermissionsResponse>(url, {});
  }

  setCanInviteUsers(userId: number, canInviteUsers: boolean) {
    const url = `${environment.BASE_URL}/admin/permissions/can-invite-users/${userId}?canInviteUsers=${canInviteUsers}`;
    return this.http.patch<CoAdminPermissionsResponse>(url, {});
  }

  setCanCreateEvent(userId: number, canCreateEvent: boolean) {
    const url = `${environment.BASE_URL}/admin/permissions/can-create-event/${userId}?canCreateEvent=${canCreateEvent}`;
    return this.http.patch<CoAdminPermissionsResponse>(url, {});
  }

  getUsersByRole(role: string, page: number = 1, limit: number = 10) {
    const apiRole = role === 'All Roles' ? '' : role;
    const params = new HttpParams()
      .set('roleName', apiRole)
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    return this.http.get<AllUsersResponse>(
      `${environment.BASE_URL}/admin/filter-and-search-users`,
      { params }
    );
  }

  
  getUsersByEmailOrName(email: string){    
    return this.http.get<AllUsersResponse>(
      `${environment.BASE_URL}/admin/filter-and-search-users?username=${email}`);
  }

  getAttendeeByEmailOrName(email: string, event_id: string){
    
    const url = `${environment.BASE_URL}/admin/search-attendees/${event_id}?keyword=${email}`;

    return this.http.get<AttendeesResponse>(url);
  }

  getAttendeeByGender(gender: string, event_id: string){
    const url = `${environment.BASE_URL}/admin/search-attendees/${event_id}?keyword=&gender=${gender}`;

    return this.http.get<AttendeesResponse>(url);
  }

  sendAdminInvite(id: number, inviteData: InviteData){
    
    return this.http.post<AllUsersResponse>(`${environment.BASE_URL}/admin/createAdmin/${id}`, inviteData);
  }

  getOrganizerDetails(id: string): Observable<OrganizerProfileInformation> {

    const url = `${environment.BASE_URL}/admin/view-organizer-credentials/${id}`;

    return this.http.get<OrganizerProfileInformation>(url);
  }

  approveOrganizer(userId: string) {
    const url = `${environment.BASE_URL}/admin/approve-organizer?organizerId=${userId}`;
    const body = { organizerId: userId };

    return this.http.post<OrganizerProfileInformation>(url, body).pipe(
      tap((response) => {
        if (response.message === 'APPROVED') {
          localStorage.setItem(`approvalStatus_${userId}`, 'Approved');
        }
      })
    );
  }

  declineOrganizer(userId: string) {

    const url = `${environment.BASE_URL}/admin/decline-organizer?organizerId=${userId}`;
    const body = { organizerId: userId };

    return this.http.post<OrganizerProfileInformation>(url, body, ).pipe(
      tap((response) => {
        if (response.message === 'DECLINE') {
          localStorage.setItem(`approvalStatus_${userId}`, 'Declined');
        }
      })
    );
  }

  getAdminProfile(id: string): Observable<{ data: any }> {

    const url = `${environment.BASE_URL}/shared/view-profile/${id}`;

    return this.http.get<{ data: any }>(url, );
  }

  updateAdminProfile(id: string, updatedProfile: Partial<AdminProfile>){
    const url = `${environment.BASE_URL}/profile/create-admin-profile`;
    return this.http.post<{ data: AdminProfile }>(url, updatedProfile, )
      .pipe(
        catchError(error => {
          return(error);
        })
      );
  }

  setProfile(profile: AdminProfile) {
    this.profileSubject.next(profile);
  }

  loadUserProfile(userId: string) {
    this.getAdminProfile(userId).subscribe({
      next: (res) => {
        this.profileSubject.next(res.data);
      },
      error: (error) => {
      }
    });
  }

  getAdminViewAttendeesByEventId(eventId: string, pageNumber: number, pageSize: number) {
      const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());
    const url = `${environment.BASE_URL}/admin/attendees-registered/${eventId}`;

    return this.http.get<AttendeesResponse>(url, {  params });
  }
}
