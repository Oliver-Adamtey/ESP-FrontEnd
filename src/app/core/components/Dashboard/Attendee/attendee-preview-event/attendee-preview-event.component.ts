import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AttendeeSidebarComponent } from '@component/attendee-sidebar/attendee-sidebar.component';
import { MeetingResponse, ViewEventdetails } from '@interface/all-eventdetails/all-eventdetails';
import { CommonModule, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomDatePipe } from '@component/custom-date.pipe';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { Subscription } from 'rxjs';
import { CustomTimePipe } from "../../../../../shared/customTime/custom-time.pipe";
import { NotificationBellComponent } from "../notification-bell/notification-bell.component";
import { NotificationService } from '@notifications//notification.service';
import { CapitalizeFirstPipe } from '@component/capitalizeFirst';
import { EventMeetingUrl } from '@interface/create-event/organizer';
import { PageResponse } from '@interface/registration/login-register';
import { DateTimeFormatPipe } from "../../Organizer/org-view-events/date-time-format.pipe";

@Component({
  selector: 'app-attendee-preview-event',
  standalone: true,
  imports: [
    AttendeeSidebarComponent,
    CommonModule,
    RouterLink,
    CustomDatePipe,
    CapitalizeFirstPipe,
    CustomTimePipe,
    NotificationBellComponent,
    DateTimeFormatPipe
],
  templateUrl: './attendee-preview-event.component.html',
  styleUrl: './attendee-preview-event.component.css'
})
export class AttendeePreviewEventComponent implements OnInit, OnDestroy {
  eventdetails!: ViewEventdetails;
  userId = sessionStorage.getItem('userId')
  eventId: number | null = null;
  preload: boolean = false;
  router = inject(Router);
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  eventDate: Date | null = null;
  meetingUrl: string = '';

  fullName = sessionStorage.getItem('fullName');

  constructor(
    private route: ActivatedRoute,
    private eventService: GetEventService,
    private cdr: ChangeDetectorRef,
    private eventMeeting: GetEventService,
    private notificationService: NotificationService,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.route.paramMap?.subscribe(params => {
      const eventId = params.get('eventId');
      if (eventId) {
        this.loadEventDetails(eventId);
        this.loadUserProfile()
        this.cdr.detectChanges();
      } else {
        this.notificationService.showError('Event ID is missing.');
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

  loadEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (res: ViewEventdetails) => {
        this.eventdetails = res;
        this.eventDate = new Date(res.eventEndDate);
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching event details');
      }
    });
  }

  registerForEvent(): void {
    if (!this.eventdetails.isAttendeeRegistered) {
      const ticketStatus = this.eventdetails.ticketStatus?.toLowerCase();

      if (ticketStatus.toLocaleLowerCase() === 'free') {
        this.router.navigate(['/attendee-free-checkout', this.eventdetails.eventId]).then(() => {
          this.cdr.detectChanges();
  
        });
      } else if (ticketStatus.toLocaleLowerCase() === 'paid') {
        this.router.navigate(['/attendee-payment', this.eventdetails.eventId]).then(() => {
  
        });
      } 
    } 

    else {
      this.joinMeeting(this.eventdetails.eventId)
    }
  }

  joinMeeting(eventId: number) {
    this.eventMeeting.attendeeMeetingLinks(eventId).subscribe({
      next: (res: MeetingResponse) => {
        this.meetingUrl = res.attendeeLink;
        window.open(this.meetingUrl, '_blank');
      },
      error: (error: HttpErrorResponse) => {
        const meetingError:PageResponse = error.error;
        this.notificationService.showError(meetingError.message );
        
      }
    });
  }

  goBack() {
    this.location.back();
  }
  
  
  calculateTotalAllocations(): number {
    if (!this.eventdetails?.ticketTiers) {
      return 0;
    }
    return this.eventdetails.ticketTiers.reduce((total, tier) => total + tier.allocation, 0);
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
