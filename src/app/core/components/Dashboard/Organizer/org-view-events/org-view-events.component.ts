import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { EventService } from '@services/Organizer/event/event.service';
import { EventMeetingUrl, EventObject, PageableResponse } from '@interface/create-event/organizer';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtDecoderService } from '@services/Organizer/JWT-Token/jwt-decoder.service';
import { NotificationService } from '@notifications//notification.service';
import { CustomDatePipe } from '@component/custom-date.pipe';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { filter, map, tap } from 'rxjs/operators';

import { DateTimeFormatPipe } from './date-time-format.pipe';
import { PageResponse } from '@interface/registration/login-register';




@Component({
  selector: 'app-org-view-events',
  standalone: true,
  imports: [CommonModule, CustomDatePipe, RouterOutlet, RouterLink, DateTimeFormatPipe],
  templateUrl: './org-view-events.component.html',
  styleUrl: './org-view-events.component.css'
})
export class OrgViewEventsComponent {
  eventdetails:boolean = false;
  preload: boolean = false;
  createEvent_: boolean = false;
  displayUsers: boolean = false;
  records: Array<EventObject> = [];

  filteredSupplier: Array<EventObject> = [];
  displayedSuppliers: Array<EventObject> = [];
  currenPage: number = 1;
  pageSize: number = 20;
  filterByCategory: string = '';
  isDropdownVisible: boolean[] = [];
  profile: boolean = false;
  email = '';

  noResultsFound: boolean = false;

  eventCreated: boolean = false;
  eventNotCreated: boolean = false;
  heading = 'Events';
  sub_heading = 'Plan and manage your gatherings effortlessly.';
  meetingUrl: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtDecodeService: JwtDecoderService,
    private eventService: EventService,
    private eventMeeting: GetEventService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
  ) {}


  isDiscardModalVisible:boolean = false;

  showDiscardConfirmation() {
    this.isDiscardModalVisible = true;
  }

  cancelDiscard() {
    this.isDiscardModalVisible = false;
  }

  confirmDiscard() {
    this.isDiscardModalVisible = false;
    sessionStorage.removeItem('BasicInformation');
    sessionStorage.removeItem('LocationAndVenue');
    sessionStorage.removeItem('DateAndTime');
    sessionStorage.removeItem('EventAndTicket');
    this.router.navigate(['/org-event']);
  }

  discard(event: boolean) {
    this.isDiscardModalVisible = true;
  }

  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);
  }

  accountSettings() {
    this.router.navigate(['/org-settings']);
  }

  toggleCard() {
    this.profile = !this.profile;
  }


  ngOnInit(): void {
    if (this.route.url) {
      this.route.url.pipe(
        map(urlSegments => urlSegments.map(segment => segment.path).join('/')),
        filter(path => path.startsWith('org-preview-page')),
        tap(() => {
          const eventId = +this.route.snapshot.url[1].path;
          this.viewEvent(eventId);
        })
      ).subscribe();
    } else {
      console.error('route.url is undefined');
    }
  }


  getAllOrganizerEvents() {
    this.eventService.getAllOrganizerEvents().subscribe({
      next: (response: PageableResponse) => {
        this.records = response.content;
        this.preload = false;
        this.createEvent_ = false;
        this.displayUsers = true;
        this.eventCreated = true;
        this.filteredSupplier = this.records;
        this.updateDisplayedSuppliers();
      },
      error: (error: HttpErrorResponse) => {
        this.preload = true;
        this.createEvent_ = true;
        this.notificationService.showError(error.error.message);
      },
    });
  }

  updateDisplayedSuppliers() {
    const startIndex = (this.currenPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedSuppliers = this.filteredSupplier.slice(startIndex, endIndex);
  }

  filterData(searchTerm: string, filterOption: string) {
    this.filteredSupplier = this.records.filter((item) => {
      const matchesSearchTerm = Object.values(item).some((val) => {
        return (
          val != null &&
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      if (filterOption === '' || filterOption === 'All') {
        return matchesSearchTerm;
      } else {
        return (
          matchesSearchTerm &&
          Object.values(item).some((val) => {
            return (
              val != null &&
              val.toString().toLowerCase().includes(filterOption.toLowerCase())
            );
          })
        );
      }
    });

    this.noResultsFound = true;
    this.noResultsFound = this.filteredSupplier.length === 0;
    this.currenPage = 1;
    this.updateDisplayedSuppliers();
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible[index] = !this.isDropdownVisible[index];
  }

  orgUpdateEvent(eventId: number) {
    this.router.navigate(['/org-update-event/' + eventId]);
  }

  eventId!: number

  ViewEventRecords: EventObject[] = [];

  viewEvent(eventId: number) {
    this.eventId = eventId
    this.eventService.getEventById(eventId).subscribe({
      next: (response: EventObject) => {
        this.ViewEventRecords = [response];
        this.records = this.records.filter(event => event.eventId !== eventId);
        this.filteredSupplier = this.records;
        this.updateDisplayedSuppliers();
        this.eventdetails = true;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  back(){
    this.router.navigate(['/org-event']);
  }

  startMeeting(eventId: number) {
    this.eventMeeting.eventMeetingLink(this.eventId).subscribe({
      next: (response: EventMeetingUrl) => {
        this.meetingUrl = response.moderatorLink;
        window.open(this.meetingUrl, '_blank');

      },
      error: (error: HttpErrorResponse) => {
        const errorResponse: PageResponse = error.error
        this.notificationService.showError(errorResponse.message);
      },
  });
  }

}
