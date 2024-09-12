import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AdminProfile, AllUsersResponse, ContentItem, InviteData, UserRole} from '../core/Interface/Admin/getAllUsers';
import { AllUsersService } from '../core/services/Admin/All Users/all-users.service';
import { UserPermissionService } from '../core/services/Admin/user-permission/user-permission.service';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private profileSubject = new BehaviorSubject<AdminProfile | null>(null);
  profile$ = this.profileSubject.asObservable();
  private timeoutCalled = false;
  private activeButtonState: { [key: number]: string } = {};

  constructor(
    private http: HttpClient,
    private allUsersService: AllUsersService,
    private notificationService: NotificationService
  ) {}

  searchUser(value: string): Observable<AllUsersResponse> {
    return this.allUsersService.getUsersByEmailOrName(value);
  }

  filterUsersByRole(role: string, page: number, limit: number): Observable<AllUsersResponse> {
    return this.allUsersService.getUsersByRole(role, page, limit);
  }

  cancelMenu(): void {
    this.notificationService.showError('Action cancelled');
  }

  loadUserProfile(userId: string): void {
    this.allUsersService.profile$.subscribe(profile => {
      this.profileSubject.next(profile);
    });
    this.allUsersService.loadUserProfile(userId);
  }

  sendInvite(storedId: number, inviteData: InviteData): Observable<AllUsersResponse> {
    return this.allUsersService.sendAdminInvite(storedId, inviteData);
  }

}
