import { Component, ChangeDetectorRef, ViewChild, ElementRef, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router,  RouterLink, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetEventService } from '../../core/services/Attendee Service/get-event.service';
import { AttendeeSidebarComponent } from '../attendee-sidebar/attendee-sidebar.component';
import { allEventdetails, allEventResponse } from '../../core/Interface/all-eventdetails/all-eventdetails';
import { CustomDatePipe } from '../custom-date.pipe';
import { Subscription } from 'rxjs';
import { NotificationService } from '@notifications//notification.service';
import { DatePickerComponent } from "../../datepicker/date-picker-items/date-picker.component";
import { CapitalizeFirstPipe } from '../capitalizeFirst';
import { NotificationBellComponent } from "../../core/components/Dashboard/Attendee/notification-bell/notification-bell.component";

@Component({
    selector: 'app-attendee-popular-events',
    standalone: true,
    templateUrl: './attendee-popular-events.component.html',
    styleUrl: './attendee-popular-events.component.css',
    imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    AttendeeSidebarComponent,
    RouterLink,
    CustomDatePipe,
    DatePickerComponent,
    CapitalizeFirstPipe,
    NotificationBellComponent
]
})
export class AttendeePopularEventsComponent implements OnInit, OnDestroy {
    events: allEventdetails[] = [];
    popularEvents: allEventdetails[] = [];
    userId: string | null = sessionStorage.getItem('userId');
    fullName = sessionStorage.getItem('fullName');
    filterByLocation: string = '';
    filterByEventTitle: string = '';
    filterByCategory: string = '';
    filterByDate: string = '';
    filterByTicketStatus: string = '';
    filters: { [key: string]: string } = {};
    showLoadingMessage: boolean = false;
    loadingTimeout: any;
    isLoading: boolean = true;
    profileSubscription!: Subscription;
    profileImageUrl: string = '';
    pageNumber: number = 1;
    
    @ViewChild('locationInput') locationInput!: ElementRef;
    @ViewChild('categorySelect') categorySelect!: ElementRef;
    @ViewChild('eventtitleInput') eventtitleInput!: ElementRef;
    @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
    @ViewChild('ticketStatusSelect') ticketStatusSelect!: ElementRef;
  
    constructor(
      private route: ActivatedRoute,
      private eventService: GetEventService,
      private cdr: ChangeDetectorRef,
      private router: Router,
      private notificationService: NotificationService
    ) { }
  
    ngOnInit(): void {
      this.fetchNextPage(this.pageNumber);
      this.loadUserProfile()

      this.loadingTimeout = setTimeout(() => {
        if (this.popularEvents.length === 0) {
          this.showLoadingMessage = true;
        }
      }, 20000);
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
        this.notificationService.showError('User ID not found');
      }
    }
  
    ngOnDestroy(): void {
      if (this.profileSubscription) {
        this.profileSubscription.unsubscribe();
      }
    }

    fetchNextPage(pageNumber: number) {
      this.eventService.getEvents(this.userId as string, pageNumber).subscribe({
        next: (res) => {
          this.events = this.events.concat(res.content);
          this.displayEventsByCurrentDates();
          this.applyFilters();
    
          if (!res.last) {
            this.fetchNextPage(pageNumber + 1);
          } else {
            this.isLoading = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching Events');
          console.error('Error fetching events', error); 
          this.isLoading = false;
        }
      });
    }
    
    displayEventsByCurrentDates() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
    
      if (this.events) {
        this.events.sort((a, b) => {
          const dateA = new Date(a.eventStartDate);
          const dateB = new Date(b.eventStartDate);
    
          const isFutureOrTodayA = dateA >= currentDate && dateA.getFullYear() === currentYear;
          const isFutureOrTodayB = dateB >= currentDate && dateB.getFullYear() === currentYear;
  
          if (isFutureOrTodayA && !isFutureOrTodayB) return -1;
          if (!isFutureOrTodayA && isFutureOrTodayB) return 1;
    
          return dateA.getTime() - dateB.getTime();
        });
      }
    }
    

    loadMoreEvents() {
      this.pageNumber++; 
      this.fetchNextPage(this.pageNumber);
    }
  
    applyFilters() {
      this.popularEvents = this.events.filter(event => {
        const matchesEventtitle = !this.filterByEventTitle || event.eventTitle.toLowerCase().includes(this.filterByEventTitle.toLowerCase());
        const matchesLocation = (!this.filterByLocation || this.filterByLocation.toLowerCase().length === 0) || 
                        (event.venueLocation && event.venueLocation.toLowerCase().includes(this.filterByLocation.toLowerCase()));
        const matchesCategory = !this.filterByCategory || event.eventCategory.toLowerCase().includes(this.filterByCategory.toLowerCase());
        const matchesTicketStatus = !this.filterByTicketStatus || (event.ticketStatus && event.ticketStatus.toLowerCase() === this.filterByTicketStatus.toLowerCase());
    
        let matchesDate = true;
        if (this.filterByDate) {
          const [startDateStr, endDateStr] = this.filterByDate.split(' - ');
          const startDate = new Date(startDateStr);
          const endDate = new Date(endDateStr);
    
          const eventStartDate = new Date(event.eventStartDate || '');
          const eventEndDate = new Date(event.eventEndDate || '');
    
          matchesDate = eventStartDate >= startDate && eventEndDate <= endDate;
        }
    
        return matchesLocation && matchesCategory && matchesTicketStatus && matchesDate && matchesEventtitle;
      });
      this.cdr.detectChanges();
    }
  
    onFilterChange(filterType: string, value: string) {
      this.filters[filterType] = value;
      this.applyFilters();
    }


    
    onDateRangeChange(dateRange: { start: Date | null; end: Date | null }) {
      if (dateRange.start && dateRange.end) {
        this.filterByDate = `${this.formatDate(dateRange.start)} - ${this.formatDate(dateRange.end)}`;
        
        const filterDateRange = {startDate: this.formatDate(dateRange.start), endDate: this.formatDate(dateRange.end) }
        this.eventService.getEventsByDate(filterDateRange).subscribe( {
          next: (res) => {
            this.events = res.content;
            this.applyFilters();
          },
          error: (error: HttpErrorResponse) => {
            this.notificationService.showError('Error fetching events by date');
          }
        });
      }
    }
  
    formatDate(date: Date | null): string {
      if (!date) return '';
      return new DatePipe('en-US').transform(date, 'yyyy-MM-dd')!;
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
  
      this.eventService.getEventsByLocationHome(value).subscribe({
        next: (res) => {
          this.popularEvents = res.content;
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
  
      this.eventService.getEventsByEventTitleHome(value).subscribe({
        next: (res) => {
          this.popularEvents = res.content;
          this.applyFilters();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching events by name');
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
        this.pageNumber = 1;
    
        if (this.userId) { 
          this.eventService.getEvents(this.userId, this.pageNumber).subscribe({
            next: (res) => {
              this.events = this.events.concat(res.content);
              this.popularEvents = [...this.events];
              this.isLoading = false;
            }
          });
        }
      } 
      this.eventService.getEventsByCategoryHome(value).subscribe({
        next: (res) => {
          this.popularEvents = res.content;
          this.applyFilters();
        },
        error: () => {
          this.notificationService.showError('Error fetching events by category');
        }
      });
    }

    onTicketStatusChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      this.filterByTicketStatus = value;
      this.clearOtherFilters('status');
      this.onFilterChange('status', value);
    
      this.isLoading = true;
      
      if (value === 'all') {
        this.pageNumber = 1;
    
        if (this.userId) { 
          this.eventService.getEvents(this.userId, this.pageNumber).subscribe({
            next: (res) => {
              this.events = this.events.concat(res.content);
              this.popularEvents = [...this.events];
              this.isLoading = false;
            }
          });
        }
      } 
      else {
        this.eventService.getEventsByTicketStatusHome(value).subscribe({
          next: (res) => {
            this.popularEvents = res.content;
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
    
    
    accountSettings() {
      this.router.navigate(['/attendee-settings']);
    }
  
    showProfileCard: boolean = false;
    email = '';
    toggleCard() {
      this.showProfileCard = !this.showProfileCard;
    }
}
