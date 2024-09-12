  import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from '@notifications//notification.service';
import { UserManagementService } from '@component/user-management.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSidebarComponent } from "@component/admin-sidebar/admin-sidebar.component";
import { AdminOrganizerDetailComponent } from '@component/admin-organizer-detail/admin-organizer-detail.component';
import { AllUsersResponse, ContentItem, UserRole, InviteData } from '@interface/Admin/getAllUsers';
import { HttpErrorResponse } from '@angular/common/http';
import { AllUsersService } from '@services/Admin/All Users/all-users.service';
import { CoAdminPermissions, CoAdminPermissionsResponse } from '@interface/Admin/permission';
import { NotificationBellComponent } from "../../Attendee/notification-bell/notification-bell.component";
import { PageResponse } from '@interface/registration/login-register';
import { UserComponent } from "../../../svg-icons/user/user.component";
import { ArrowLeftComponent } from "../../../svg-icons/arrow-left/arrow-left.component";
import { ArrowRightComponent } from "../../../svg-icons/arrow-right/arrow-right.component";


@Component({
  selector: 'app-admin-user-permission',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminSidebarComponent,
    AdminOrganizerDetailComponent,
    RouterLink,
    FormsModule,
    NotificationBellComponent,
    UserComponent,
    ArrowLeftComponent,
    ArrowRightComponent
],
  templateUrl: './admin-user-permission.component.html',
  styleUrls: ['./admin-user-permission.component.css']
})
export class AdminUserPermissionComponent {
  adminName = '';
  adminEmail = '';
  storedId!: number;
  userId: number | null = null;
  isModalOpen = false;
  token: string | null = null;
  allUsers: CoAdminPermissionsResponse | null = null;
  filteredUser: CoAdminPermissions[] = [];
  users: CoAdminPermissions[] = [];
  totalUsersCount: number = 0;
  filterByRoles: string = '';
  keyword: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 13;
  private timeoutCalled: boolean = false;
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  showProfileCard: boolean = false;
  activeTab: string = 'admin-permission';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private allUsersService: AllUsersService,
    private notificationService: NotificationService,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {
    const storedId = sessionStorage.getItem('userId');
    if (storedId) {
      this.userId = parseInt(storedId);
      this.loadUsers(this.currentPage, this.itemsPerPage);
    }

    this.loadUserProfile();
  }

 
  loadUsers(page: number, itemsPerPage: number, search?: string): void {
    if (this.userId !== null) {
      this.allUsersService.getAllCoAdminPermission(this.userId, page, itemsPerPage, search).subscribe({
        next: (response: CoAdminPermissionsResponse) => {
          this.filteredUser = response.content;
          this.totalUsersCount = response.totalElements;
          this.cdr.detectChanges();
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse: PageResponse = error.error
          this.notificationService.showError(errorResponse.message)
        }
      });
    }
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileSubscription = this.allUsersService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName = profile.lastName;
          this.email = profile.email;
        }
      });
      this.allUsersService.loadUserProfile(userId);
    } 
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  filterByEmailAndUsername(search: string){
    this.loadUsers(this.currentPage, this.itemsPerPage, search);
  }

  handlePermissionChange(permissionType: string, userId: number, event: Event): void {
    const target = event.target as HTMLInputElement; 
    const permissionValue = target.checked;
  
    let apiCall: Observable<CoAdminPermissionsResponse>;
  
    switch (permissionType) {
      case 'canViewUsers':
        apiCall = this.allUsersService.setCanViewUsers(userId, permissionValue);
        break;
      case 'canDeleteUsers':
        apiCall = this.allUsersService.setCanDeleteUsers(userId, permissionValue);
        break;
      case 'canViewAttendees':
        apiCall = this.allUsersService.setCanViewAttendees(userId, permissionValue);
        break;
      case 'canInviteUsers':
        apiCall = this.allUsersService.setCanInviteUsers(userId, permissionValue);
        break;
      case 'canCreateEvent':
        apiCall = this.allUsersService.setCanCreateEvent(userId, permissionValue);
        break;
      default:
        console.error('Unknown permission type:', permissionType);
        return; 
    }

    apiCall.subscribe()
  }

  cancelMenu(): void {
    this.isModalOpen = false;
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.totalUsersCount) {
      this.currentPage++;
      this.loadUsers(this.currentPage, this.itemsPerPage);
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers(this.currentPage, this.itemsPerPage);
    }
  }
  
  getTotalPages(): number {
    return Math.ceil(this.totalUsersCount / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }
  
  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.loadUsers(this.currentPage, this.itemsPerPage);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
