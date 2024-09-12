  import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
  import { Router, RouterLink } from '@angular/router';
  import { CommonModule } from '@angular/common';
  import { AllUsersService } from '@services/Admin/All Users/all-users.service';
  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  import { UserPermissionService } from '@services/Admin/user-permission/user-permission.service';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { AdminSidebarComponent } from "@component/admin-sidebar/admin-sidebar.component";
  import { AllUsersResponse, ContentItem, InviteData, UserRole } from '../../../../Interface/Admin/getAllUsers';
  import { AdminOrganizerDetailComponent } from '@component/admin-organizer-detail/admin-organizer-detail.component';
  import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
  import { NotificationService } from '@notifications//notification.service';
import { NotificationBellComponent } from "../../Attendee/notification-bell/notification-bell.component";
import { PageResponse } from '@interface/registration/login-register';
import { UserActivateComponent } from '@components/svg-icons/user-activate/user-activate.component';
import { OpenComponent } from '@components/svg-icons/open/open.component';
import { UserDeactivateComponent } from '@components/svg-icons/user-deactivate/user-deactivate.component';
import { DeleteComponent } from "../../../svg-icons/delete/delete.component";
import { ArrowLeftComponent } from "../../../svg-icons/arrow-left/arrow-left.component";
import { ArrowRightComponent } from "../../../svg-icons/arrow-right/arrow-right.component";
import { UserComponent } from "../../../svg-icons/user/user.component";
  
  
  @Component({
    selector: 'app-users-admin',
    standalone: true,
    templateUrl: './users-admin.component.html',
    styleUrls: ['./users-admin.component.css'],
    imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminSidebarComponent,
    AdminOrganizerDetailComponent,
    RouterLink,
    FormsModule,
    NotificationBellComponent,
    UserActivateComponent,
    UserDeactivateComponent,
    OpenComponent,
    DeleteComponent,
    ArrowLeftComponent,
    ArrowRightComponent,
    UserComponent
]
  })
  export class UsersAdminComponent implements OnInit, OnDestroy {
    @ViewChild('filterSearchInput') filterSearchInput!: ElementRef;
    @ViewChild('filterRolesSelect') filterRolesSelect!: ElementRef;
    
    isModalOpen = false;
    adminName = '';
    adminEmail = '';
    userRole: string = 'CO_ADMIN';
    token: string | null = null;
    allUsers: AllUsersResponse | null = null;
    filteredUsers: ContentItem[] = [];
    users: ContentItem[] = [];
    totalUsersCount: number = 0;
    filterByRoles: string = '';
    filterUserEmail: string = '';
    currentPage: number = 1;
    itemsPerPage: number = 13;
    storedId!: number;
    hoveredButtonId: number | null = null;
    hoveredButtonAction: string | null = null;
    activeButtonState: { [key: number]: string } = {};
    hoverButtonState: { [key: number]: string } = {};
    threeButtonAction: boolean = false;
    private timeoutCalled: boolean = false;
    fullName = localStorage.getItem('fullName');
    email = localStorage.getItem('email');
    profileSubscription!: Subscription;
    profileImageUrl: string = '';
    activeTab: string = 'user-settings';

    isMenuModalVisible = false;
    pendingAction: { userId: number, action: string } | null = null;
    confirmationMessage: string = '';
  
    constructor(
      private router: Router,
      private http: HttpClient,
      private userPermissionService: UserPermissionService,
      private allUsersService: AllUsersService,
      private cdr: ChangeDetectorRef,
      private notificationService: NotificationService,
    
    ) {}
  
    ngOnInit(): void {
      this.loadUsers(this.currentPage, this.itemsPerPage);
      this.loadActiveButtonState();
      this.loadUserProfile();
      this.retrieveStoredId();
      
      const storedRole = sessionStorage.getItem('userRole');
      if (storedRole) {
        this.userRole = storedRole as UserRole;
      } else {
        this.userRole = 'CO_ADMIN';
      }
    }

    loadUsers(page: number, itemsPerPage: number): void {
      this.allUsersService.getAll(page, itemsPerPage).subscribe({
        next: (response: AllUsersResponse) => {
          this.filteredUsers = response.data.content;
          this.applyFilters();
          this.totalUsersCount = response.data.totalElements;
          this.cdr.detectChanges(); 

          if (!this.timeoutCalled) {
            this.timeoutCalled = true;
            setTimeout(() => {
              this.timeoutCalled = false;
            }, 1000);
          }
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse: PageResponse = error.error
          this.notificationService.showError(errorResponse.message)
        },
        complete: () => {
          this.cdr.detectChanges();
        }
      });
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
      } else {
        this.notificationService.showError('User ID not found in local storage');
      }
    }
  
    ngOnDestroy(): void {
      if (this.profileSubscription) {
        this.profileSubscription.unsubscribe();
      }
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

    searchUser(value: string) {
      this.filterUserEmail = value;
      this.clearOtherFilters('email');

      if (!value.trim()) {
        this.loadUsers(this.currentPage, this.itemsPerPage);
        return;
      }
    
      this.allUsersService.getUsersByEmailOrName(value).subscribe({
        next: (res: { data: { content: ContentItem[] } }) => {
            this.filteredUsers = res.data.content;
            this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching users by name or email');
        }
      });
    }  

    loadUsersByRole(role: string) {
      let page = 1;
      const limit = 10;
      let allUsers: ContentItem[] = [];
  
      const fetchAllUsers = () => {
        this.allUsersService.getUsersByRole(role, page, limit).subscribe({
          next: (res: AllUsersResponse) => {
            allUsers = allUsers.concat(res.data.content);
            this.totalUsersCount = res.data.totalElements;
  
            if (res.data.content.length < limit || allUsers.length >= this.totalUsersCount) {
              this.filteredUsers = allUsers;
              this.applyFilters();
            } else {
              page++;
              fetchAllUsers();
            }
          },
          error: (error: HttpErrorResponse) => {
            this.notificationService.showError('Error fetching users by role');
          }
        });
      };
  
      fetchAllUsers();
    }
  
    filterUsersByRole(value: string) {
      this.filterByRoles = value;
      this.clearOtherFilters('role');

      if(this.filterByRoles === 'All') {
        this.loadUsers(this.currentPage, this.itemsPerPage);
        return;
      }
      
      let page = 1;
      const limit = 10;
      let allUsers: ContentItem[] = [];
  
      const fetchAllUsers = () => {
        this.allUsersService.getUsersByRole(value, page, limit).subscribe({
          next: (res: AllUsersResponse) => {
            allUsers = allUsers.concat(res.data.content);
            this.totalUsersCount = res.data.totalElements;
  
            if (res.data.content.length < limit || allUsers.length >= this.totalUsersCount) {
              this.filteredUsers = allUsers;
              this.applyFilters();
            } else {
              page++;
              fetchAllUsers();
            }
          },
          error: (error: HttpErrorResponse) => {
            this.notificationService.showError('Error fetching users by role');
          }
        });
      };
  
      fetchAllUsers();
    }
    
    applyFilters() {
      if (this.allUsers) {
        this.filteredUsers = this.users.filter((user: ContentItem) => {
          const matchesEmailName = !this.filterUserEmail || user.fullName.toLowerCase().includes(this.filterUserEmail.toLowerCase());
          const matchesRole = !this.filterByRoles || user.role.toLowerCase() === this.filterByRoles.toLowerCase();
          return matchesEmailName && matchesRole;
        });
        
        this.totalUsersCount = this.filteredUsers.length;
        this.cdr.detectChanges();
      }
    }
    
    
    onFilterChange(filterType: string, value: string) {
      this.filteredUsers.forEach(user => {
        if (filterType === 'email') {
          user.fullName = value;
        } else if (filterType === 'role') {
          user.role = value;
        }
      });
      this.applyFilters();
    }

  clearOtherFilters(exclude: string) {
    if (exclude !== 'email') {
      this.filterUserEmail = '';
      if (this.filterSearchInput && this.filterSearchInput.nativeElement) {
        this.filterSearchInput.nativeElement.value = '';
      }
    }
    if (exclude !== 'role') {
      this.filterByRoles = '';
      if (this.filterRolesSelect && this.filterRolesSelect.nativeElement) {
        this.filterRolesSelect.nativeElement.value = '';
      }
    }
  }
    
  
    activateUser(id: number): void {
      this.userPermissionService.activateUser(id).subscribe(
        () => {
          this.notificationService.showSuccess('User activated successfully');
          this.filteredUsers = this.filteredUsers.map(user => {
            if (user.id === id) {
              return { ...user, enabled: true, statusText: 'Active' };
            } else {
              return user;
            }
          });
        },
        (error) => {
          this.notificationService.showError('Error activating user');
        }
      );
    }
    
    deactivateUser(id: number): void {
      this.userPermissionService.deactivateUser(id).subscribe(
        () => {
          this.notificationService.showSuccess('User deactivated successfully');
          this.filteredUsers = this.filteredUsers.map(user => {
            if (user.id === id) {
              return { ...user, enabled: false, statusText: 'Inactive' };
            } else {
              return user;
            }
          });
        },
        (error) => {
          this.notificationService.showError('Error deactivating user');
        }
      );
    }
    
    deleteUser(userId: number): void {
      this.userPermissionService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== userId);
          this.filteredUsers = this.filteredUsers.filter(user => user.id !== userId)
          this.totalUsersCount--

          this.cdr.detectChanges();
          this.notificationService.showSuccess('User deleted successfully');
        },
        (error) => {
          this.notificationService.showError(error);
        }
      );
    }
    
  
    actionMenu(userId: number) {
      if (this.storedId === userId && this.threeButtonAction) {
        this.storedId;
        this.threeButtonAction = false;
      } else {
        this.storedId = userId;
        this.threeButtonAction = true;
      }
    }

    setActiveButton(userId: number, action: string) {
      this.isMenuModalVisible = true;
      this.pendingAction = { userId, action };

      if (action === 'activate') {
        this.confirmationMessage = 'Are you sure you want to activate this user?';
      } else if (action === 'deactivate') {
        this.confirmationMessage = 'Are you sure you want to deactivate this user?';
      } else if (action === 'delete') {
        this.confirmationMessage = 'Are you sure you want to delete this user?';
      }
    }
  
    cancelMenu() {
      this.isModalOpen = false;
      this.isMenuModalVisible = false;
      this.pendingAction = null;
    }
  
    confirmAction() {
      if (this.pendingAction) {
        const { userId, action } = this.pendingAction;
  
        this.activeButtonState[userId] = action;
        this.saveActiveButtonState();
  
        if (action === 'activate') {
          this.activateUser(userId);
        } else if (action === 'deactivate') {
          this.deactivateUser(userId);
        } else if (action === 'delete') {
          this.deleteUser(userId);
        }
  
        this.pendingAction = null;
      }
  
      this.isMenuModalVisible = false;
    }
  
    hoverButton(userId: number, action: string) {
      this.hoveredButtonId = userId;
      this.hoveredButtonAction = action;
    }
  
    unhoverButton(userId: number, action: string) {
      if (this.hoveredButtonId === userId && this.hoveredButtonAction === action) {
        this.hoveredButtonId = null;
        this.hoveredButtonAction = null;
      }
    }
  
    isActiveButton(userId: number, action: string): boolean {
      return this.activeButtonState[userId] === action;
    }
  
    isHoverButton(userId: number, action: string): boolean {
      return this.hoveredButtonId === userId && this.hoveredButtonAction === action;
    }
  
    saveActiveButtonState() {
      sessionStorage.setItem('activeButtonState', JSON.stringify(this.activeButtonState));
    }
  
    loadActiveButtonState() {
      const savedState = sessionStorage.getItem('activeButtonState');
      if (savedState) {
        this.activeButtonState = JSON.parse(savedState);
      }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      if (!target.closest('.relative')) {
        this.threeButtonAction = false;
        this.storedId;
      }
    }
    
  
    showProfileCard: boolean = false;
    toggleCard() {
      this.showProfileCard = !this.showProfileCard;
    }
  
    accountSettings() {
      this.router.navigate(['/admin-settings']);
    }


    openModal() {
      this.isModalOpen = true;
    }  

    retrieveStoredId(): void {
      const storedIdString = sessionStorage.getItem('userId');
      if (storedIdString) {
        this.storedId = +storedIdString; 
        this.token = sessionStorage.getItem('token');
      }
    }

    sendInvite() {
      if (this.storedId) {
        if (this.userRole === 'CO_ADMIN') {
          const inviteData: InviteData = {
            fullName: this.adminName,
            email: this.adminEmail,
            role: this.userRole as UserRole,
          };

          this.allUsersService.sendAdminInvite(this.storedId, inviteData).subscribe({
            next: (response: AllUsersResponse) => {
              this.notificationService.showSuccess(response.message)
              this.cancelMenu();
            },
            error: (error: HttpErrorResponse) => {
              const inviteError: PageResponse = error.error
              this.notificationService.showError(inviteError.message)
            }
          })
        }
      }
    }
    

    setActiveTab(tab: string): void {
      this.activeTab = tab;
    }
  
  }
  