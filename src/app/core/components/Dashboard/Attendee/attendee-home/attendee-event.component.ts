import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy, inject, ViewEncapsulation, forwardRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { NotificationService } from '@notifications//notification.service';
import { AuthServicesService } from '@services/auth/auth-services.service';
import { DatePickerComponent } from "../../../../../datepicker/date-picker-items/date-picker.component";
import { DatePickerService } from '../../../../../datepicker/date-picker-services/date-picker.service';
import { CustomDatePipe } from '@component/custom-date.pipe';
import { RecommendedEventsComponent } from "../../../../../pages/recommended-events/recommended-events.component";
import { AttendeeSidebarComponent } from '@component/attendee-sidebar/attendee-sidebar.component';
import { AttendeeUpcomingEventsComponent } from '@component/attendee-upcoming-events/attendee-upcoming-events.component';
import { allEventdetails } from '@interface/all-eventdetails/all-eventdetails';
import { CapitalizeFirstPipe } from '@component/capitalizeFirst';
import { NotificationBellComponent } from "../notification-bell/notification-bell.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-attendee-event',
  standalone: true,
  templateUrl: './attendee-event.component.html',
  styleUrls: ['./attendee-event.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttendeeEventComponent),
      multi: true
    }
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    AttendeeSidebarComponent,
    AttendeeUpcomingEventsComponent,
    RouterLink,
    CustomDatePipe,
    DatePickerComponent,
    RecommendedEventsComponent,
    CapitalizeFirstPipe,
    NotificationBellComponent
]
})
export class AttendeeEventComponent implements OnInit, OnDestroy {
  events: allEventdetails[] = [];
  popularEvents: allEventdetails[] = [];
  displayedEvents: allEventdetails[] = []; 
  userId: string | null = sessionStorage.getItem('userId');
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  profileImageUrl: string = '';
  filterByLocation: string = '';
  filterByEventTitle: string = '';
  filterByCategory: string = '';
  filterByDate: string = '';
  filterByTicketStatus: string = '';
  noEventsFound: boolean = false;
  isLoading: boolean = true;
  showLoadingMessage: boolean = true;
  loadingTimeout: any;
  profileSubscription!: Subscription;
  initialEventLimit: number = 4;

  @ViewChild('locationInput') locationInput!: ElementRef;
  @ViewChild('eventtitleInput') eventtitleInput!: ElementRef;
  @ViewChild('categorySelect') categorySelect!: ElementRef;
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;

  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthServicesService);
  eventService = inject(GetEventService);
  notificationService = inject(NotificationService);
  dateService = inject(DatePickerService);

  constructor() { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadEvents();
      }
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.profileSubscription = this.eventService.profile$.subscribe(profile => {
      if (profile) {
        this.profileImageUrl = profile.profileImageUrl;
        this.fullName = profile.lastName;
        this.email = profile.email;
      }
    });
    this.eventService.loadUserProfile(this.userId as string);
    this.loadingTimeout = setTimeout(() => {
      if (this.popularEvents.length === 0) {
        this.showLoadingMessage = true;
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  loadEvents() {
    this.eventService.getEvents(this.userId as string).subscribe({
      next: (res) => {
        this.events = res.content;
        this.updateDisplayedEvents();
        this.cdr.detectChanges();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
      }
    });
  }

  updateDisplayedEvents() {
    if (!this.areFiltersApplied()) {
      this.popularEvents = this.events.slice(0, this.initialEventLimit);
    } else {
      this.popularEvents = this.events;
    }
    this.displayedEvents = this.popularEvents;
  }
  

  updateProfile(updatedProfile: any) {
    this.eventService.updateAttendeeProfile(this.userId as string, updatedProfile).subscribe(
      response => {
        this.profileImageUrl = response.data.profileImageUrl;
        this.notificationService.showSuccess('Profile updated successfully');
      },
      error => {
        this.notificationService.showError('Error updating profile. Please try again.');
      }
    );
  }

  applyFilters() {
    this.isLoading = true;

    this.events = this.events.filter(event => {
      let matchesDate = true;
      if (this.filterByDate) {
        const [startDateStr, endDateStr] = this.filterByDate.split(' - ');
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        const eventStartDate = new Date(event.eventStartDate || '');
        const eventEndDate = new Date(event.eventEndDate || '');

        matchesDate = eventStartDate >= startDate && eventEndDate <= endDate;
      }

      const matchesLocation = !this.filterByLocation || event.venueLocation.toLowerCase().includes(this.filterByLocation.toLowerCase());
      const matchesEventtitle = !this.filterByEventTitle || event.eventTitle.toLowerCase().includes(this.filterByEventTitle.toLowerCase());
      const matchesCategory = !this.filterByCategory || event.eventCategory.toLowerCase().includes(this.filterByCategory.toLowerCase());
      const matchesTicketStatus = !this.filterByTicketStatus || (event.ticketStatus && event.ticketStatus.toLowerCase() === this.filterByTicketStatus.toLowerCase());

      return matchesLocation && matchesCategory && matchesTicketStatus && matchesEventtitle && matchesDate;
    });

    this.updateDisplayedEvents(); 
    this.cdr.detectChanges();

    this.isLoading = false;
  }

  onDateRangeChange(dateRange: { start: Date | null; end: Date | null }) {
    if (dateRange.start && dateRange.end) {
      this.filterByDate = `${this.formatDate(dateRange.start)} - ${this.formatDate(dateRange.end)}`;
      
      const filterDateRange = {startDate: this.formatDate(dateRange.start), endDate: this.formatDate(dateRange.end) };
      this.eventService.getEventsByDate(filterDateRange).subscribe({
        next: (res) => {
          this.events = res.content;
          this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching some events by dates');
        }
      });
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd')!;
  }

  onFilterChange(filterType: string, value: string) {
    switch (filterType) {
      case 'location':
        this.filterByLocation = value;
        break;
      case 'eventtitle':
        this.filterByEventTitle = value;
        break;
      case 'category':
        this.filterByCategory = value;
        break;
      case 'status':
        this.filterByTicketStatus = value;
        break;
      case 'date':
        this.filterByDate = value;
        break;
    }
    this.applyFilters();
  }

  clearOtherFilters(exclude: string) {
    if (this.locationInput && exclude !== 'location') {
      this.filterByLocation = '';
      this.locationInput.nativeElement.value = '';
    }
    if (this.eventtitleInput && exclude !== 'eventtitle') {
      this.filterByEventTitle = '';
      this.eventtitleInput.nativeElement.value = '';
    }
    if (this.categorySelect && exclude !== 'category') {
      this.filterByCategory = '';
      this.categorySelect.nativeElement.value = '';
    }
    if (this.datePicker && exclude !== 'date') {
      this.filterByDate = '';
      this.datePicker.clear(); 
    }
    if (this.ticketStatusSelect && exclude !== 'status') {
      this.filterByTicketStatus = '';
      this.ticketStatusSelect.nativeElement.value = '';
    }
  }

  onLocationChange(value: string) {
    this.filterByLocation = value;
    this.clearOtherFilters('location');
    this.onFilterChange('location', value);
    this.isLoading = true;
    console.log(value)

    this.eventService.getEventsByLocationHome(value).subscribe({
      next: (res) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by location');
      },

      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onEventtitleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterByEventTitle = value;
    this.clearOtherFilters('eventtitle');
    this.onFilterChange('eventtitle', value);
    this.isLoading = true;

    this.eventService.getEventsByEventTitleHome(value).subscribe({
      next: (res) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by name');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByCategory = value;
    this.clearOtherFilters('category');
    this.onFilterChange('category', value);

    this.isLoading = true;
    
    if (value === 'all') {  
      if (this.userId) { 
        this.eventService.getEvents(this.userId).subscribe({
          next: (res) => {
            this.events = res.content;
            this.updateDisplayedEvents();
            this.isLoading = false;
          }
        });
      }
    } 
    else {
      this.eventService.getEventsByCategoryHome(value).subscribe({
        next: (res) => {
          this.events = res.content;
          this.applyFilters();
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching events by category');
          this.isLoading = false;
        }
      });
    }
  }

  onTicketStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByTicketStatus = value;
    this.clearOtherFilters('status');
    this.onFilterChange('status', value);

    this.isLoading = true;
    
    if (value === 'all') {  
      if (this.userId) { 
        this.eventService.getEvents(this.userId).subscribe({
          next: (res) => {
            this.events = res.content;
            this.updateDisplayedEvents();
            this.isLoading = false;
          }
        });
      }
    } 
    else {
      this.eventService.getEventsByTicketStatusHome(value).subscribe({
        next: (res) => {
          this.events = res.content;
          this.applyFilters();
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching events by ticket status');
          this.isLoading = false;
        }
      });
    }
  }

  areFiltersApplied(): boolean {
    return this.filterByLocation !== '' || this.filterByEventTitle !== '' || this.filterByDate !== '' || this.filterByCategory !== '' || this.filterByTicketStatus !== '';
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }
}
