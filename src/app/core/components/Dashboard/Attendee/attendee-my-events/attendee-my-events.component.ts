import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject, OnDestroy} from '@angular/core';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { CommonModule, DatePipe } from '@angular/common';
import { allEventdetails, allEventResponse, registeredEvents } from '@interface/all-eventdetails/all-eventdetails';
import { AttendeeSidebarComponent } from '@component/attendee-sidebar/attendee-sidebar.component';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomDatePipe } from "@component/custom-date.pipe";
import { NotificationService } from '@notifications//notification.service';
import { DatePickerComponent } from "../../../../../datepicker/date-picker-items/date-picker.component";
import { CapitalizeFirstPipe } from "../../../../../shared/capitalizeFirst";
import { NotificationBellComponent } from "../notification-bell/notification-bell.component";

@Component({
    selector: 'app-attendee-my-events',
    standalone: true,
    templateUrl: './attendee-my-events.component.html',
    styleUrl: './attendee-my-events.component.css',
    imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    AttendeeSidebarComponent,
    CustomDatePipe,
    DatePickerComponent,
    CapitalizeFirstPipe,
    NotificationBellComponent
]
})
export class AttendeeMyEventsComponent implements OnInit, OnDestroy {
  events: allEventdetails[] = [];
  filterByLocation: string = '';
  filterByDate: string = '';
  filterByEventTitle: string = '';
  filterByCategory: string = '';
  filterByTicketStatus: string = '';
  filterSearch: string = '';
  fullName = sessionStorage.getItem('fullName');
  userId: string | null = sessionStorage.getItem('userId');
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  filters: { [key: string]: string } = {};
  isLoading: boolean = true;
  showLoadingMessage: boolean = true;

  @ViewChild('eventtitleInput') eventtitleInput!: ElementRef;
  @ViewChild('locationInput') locationInput!: ElementRef;
  @ViewChild('categorySelect') categorySelect!: ElementRef;
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;


  constructor(
    private eventService: GetEventService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadEventRegistered();
    this.loadUserProfile();
  }

  loadEventRegistered() {
    this.eventService.getMyEventRegisteredById(this.userId as string).subscribe({
      next: (res: registeredEvents) => {
        this.events = res.content;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching Events, waiting...');
        this.isLoading = false;
      }
    });
  }


  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileSubscription = this.eventService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName = profile.lastName;
          this.email = profile.email;
        }
      });
      this.eventService.loadUserProfile(userId);
    } else {
      this.notificationService.showError('User not found');
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  applyFilters() {
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
    this.cdr.detectChanges();
  }

  onFilterChange(filterType: string, value: string) {
    this.filters[filterType] = value;
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

  onLocationChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterByLocation = value;
    this.clearOtherFilters('location');
    this.onFilterChange('location', value);

    this.eventService.filterMyEvents(value).subscribe({
      next: (res: registeredEvents) => {
        console.log('Registered events fetched by location:', res); 
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by location');
      }
    });
  }

  onEventtitleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.filterByEventTitle = value;
    this.clearOtherFilters('eventtitle');
    this.onFilterChange('eventtitle', value);

    this.eventService.filterMyEvents(value).subscribe({
      next: (res) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by location:');
      }
    });
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.filterByCategory = value;
    this.clearOtherFilters('category');
    this.onFilterChange('category', value);

    this.eventService.filterMyEvents(value).subscribe({
      next: (res:registeredEvents) => {
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by category');
      }
    });
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd')!;
  }

  onDateRangeChange(dateRange: { start: Date | null; end: Date | null }) {
    console.log('Date Range Change:', dateRange);
    if (dateRange.start && dateRange.end) {
      this.filterByDate = `${this.formatDate(dateRange.start)} - ${this.formatDate(dateRange.end)}`;
      
      const filterDateRange = {eventStartDate: this.formatDate(dateRange.start), eventEndDate: this.formatDate(dateRange.end) }
      this.eventService.filterMyEvents(filterDateRange).subscribe( {
        next: (res) => {
          this.events = res.content;
          this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching events by category');
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

    this.eventService.filterMyEvents(value).subscribe({
      next: (res:registeredEvents) => {
        console.log(res)
        this.events = res.content;
        this.applyFilters();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching events by ticket status');
      }
    });
  }

  areFiltersApplied(): boolean {
    return this.filterByLocation !== '' || this.filterByDate !== '' || this.filterByCategory !== '' || this.filterByTicketStatus !== '';
  }

  showProfileCard: boolean = false;
  email = '';
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }
}
