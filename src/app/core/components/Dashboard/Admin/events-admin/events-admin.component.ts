import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { EventAdminService } from '@services/Admin/event-admin/event-admin.service';
import { CommonModule } from '@angular/common';
import { environment } from '@environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminSidebarComponent } from "@component/admin-sidebar/admin-sidebar.component";
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from '@component/custom-date.pipe';
import { AllUsersService } from '@services/Admin/All Users/all-users.service';
import { allEventdetails, allEventResponse } from '@interface/all-eventdetails/all-eventdetails';
import { AdminViewAttendeesComponent } from '@component/admin-view-attendees/admin-view-attendees.component';
import { NotificationService } from '@notifications//notification.service';
import { CapitalizeFirstPipe } from '@component/capitalizeFirst';
import { NotificationBellComponent } from '@components/Dashboard/Attendee/notification-bell/notification-bell.component';
import { PageResponse } from '@interface/registration/login-register';



@Component({
    selector: 'app-events-admin',
    standalone: true,
    templateUrl: './events-admin.component.html',
    styleUrl: './events-admin.component.css',
    imports: [
      AdminViewAttendeesComponent,
      CommonModule,
      FormsModule,
      RouterLink,
      AdminSidebarComponent,
      CustomDatePipe,
      CapitalizeFirstPipe,
      NotificationBellComponent
    ]
})
export class EventsAdminComponent implements OnInit, OnDestroy {
  allEvents: allEventdetails[] = [];
  filterByTicketStatus: string = '';
  filterByLocation: string = '';
  showLoadingMessage: boolean = false;
  totalEventsCount: number = 0;
  userId: string | null = sessionStorage.getItem('userId');
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  hoveredButtonId: number | null = null;
  hoveredButtonAction: string | null = null;
  activeButtonState: { [key: number]: string } = {};
  hoverButtonState: { [key: number]: string } = {};
  storedId!: number;
  threeButtonAction: boolean = false;
  isMenuModalVisible = false;
  pendingAction: { userId: number, action: string } | null = null;
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  isLoading: boolean = true;
  pageNumber: number = 1;
  pageSize: number = -1;

  
  
  @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;
  @ViewChild('locationInput') locationInput!: ElementRef;

  notificationService = inject(NotificationService)

  constructor(
    private route: ActivatedRoute,
    private adminEventService: EventAdminService,
    private allUsersService: AllUsersService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.fetchAllEvents(this.pageNumber, this.pageSize);
    this.loadUserProfile()
  }

  fetchAllEvents(pageNumber: number, pageSize: number) {
    this.adminEventService.getEvents(this.userId as string, pageNumber, pageSize)?.subscribe({
      next: (res: allEventResponse) => {
        this.allEvents = res.content;
        this.totalEventsCount = this.allEvents.length;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false; 
        const errorResponse: PageResponse = error.error;
        this.notificationService.showError(error.message);
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
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  onLocationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterByLocation = value;
    this.clearOtherFilters('location');
    
    if (!value.trim()) {
      this.fetchAllEvents(this.pageNumber, this.pageSize);
      return;
    }

    this.adminEventService.getEventsByLocation(value, this.pageNumber, this.pageSize).subscribe({
      next: (res: allEventResponse) => {
        this.allEvents = res.content;
        this.totalEventsCount = this.allEvents.length;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        const errorResponse: PageResponse = error.error;
        this.notificationService.showError(error.message);
      }
    });
  }


  onTicketStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByTicketStatus = value;
    this.clearOtherFilters('status');
  
    if (value === 'all') {
      this.filterByTicketStatus = 'all';
      this.allEvents = []; 
      this.isLoading = true; 
      this.fetchAllEvents(this.pageNumber, this.pageSize); 
    } else {
      this.adminEventService.getEventsByTicketStatus(value, this.pageNumber, this.pageSize).subscribe({
        next: (res: allEventResponse) => {
          this.allEvents = res.content;
          this.totalEventsCount = this.allEvents.length;
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          const errorResponse: PageResponse = error.error;
          this.notificationService.showError(error.message);
        }
      });
    }
  }
  
  clearOtherFilters(exclude: string) {
    if (exclude !== 'location') {
      this.filterByLocation = '';
      if (this.locationInput && this.locationInput.nativeElement) {
        this.locationInput.nativeElement.value = '';
      }
    }
    if (exclude !== 'status') {
      this.filterByTicketStatus = '';
      this.ticketStatusSelect.nativeElement.value = '';
    }
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
    localStorage.setItem('activeButtonState', JSON.stringify(this.activeButtonState));
  }

  loadActiveButtonState() {
    const savedState = localStorage.getItem('activeButtonState');
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

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }
  
}
