import { Event } from '@interface/all-eventdetails/organizer-interface';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '@notifications//notification.service';
import { OrganizerDashComponent } from '@component/Organizer/organizer-sidebar/organizer-dash.component';
import { OrganizerTopBarComponent } from '@component/Organizer/organizer-top-bar/organizer-top-bar.component';
import { UserPaginationComponent } from '@component/Organizer/pagination/user-pagination.component';
import { PreloadGeneralComponent } from '@component/preload-general/preload-general.component';
import {
  EventObject,
  PageableResponse,
} from '@interface/create-event/organizer';
import { PageDataResponse, PageResponse } from '@interface/registration/login-register';
import { CreatedEventService } from '@services/Organizer/created-event/created-event.service';
import { EventService } from '@services/Organizer/event/event.service';
import { JwtDecoderService } from '@services/Organizer/JWT-Token/jwt-decoder.service';
import { CustomDatePipe } from "@component/custom-date.pipe";
import { GetUsersService } from '@services/Organizer/get-users/get-users.service';

@Component({
  selector: 'app-event',
  standalone: true,
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    PreloadGeneralComponent,
    UserPaginationComponent,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    CustomDatePipe,

  ],
})
export class EventComponent {
  preload: boolean = false;
  createEvent_: boolean = false;
  displayUsers: boolean = false;
  records: Array<EventObject> = [];
  data: Array<EventObject> = [];
  displayedPages: Array<EventObject> = [];
  currentPage: number = 1;
  pageSize: number = 20;
  filterByCategory: string = '';
  filterByStatus: string = '';
  isDropdownVisible: boolean[] = [];
  profile: boolean = false;
  email = '';
  totalPages: number = 0;
  eventCreated: boolean = false;
  eventNotCreated: boolean = false;
  heading = 'Events';
  sub_heading = 'Plan and manage your gatherings effortlessly.';
  noResultsFound: boolean = false;


  constructor(
    private router: Router,
    private CreatedEventService: CreatedEventService,
    private http: HttpClient,
    private jwtDecodeService: JwtDecoderService,
    private eventService: EventService,
    private notificationService: NotificationService,
    private getEventsByFilter: GetUsersService,

  ) { }

  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);
  }

  accountSettings() {
    this.router.navigate(['/org-settings']);
  }

  toggleCard() {
    this.profile = !this.profile;
  }

  ngOnInit() {
    this.getAllOrganizerEvents(this.currentPage);

  }

  pageDataResponse?: PageableResponse

  getAllOrganizerEvents(currentPage: number, search?: string, category?: string, status?: string) {
    this.getEventsByFilter.getEventsByFiltering(currentPage, this.pageSize, search, category, status).subscribe({
      next: (response: PageableResponse) => {
        this.records = response.content;
                this.pageDataResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  updatePage() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPages = this.data.slice(startIndex, endIndex);
  }


  nextPage() {

    if (this.currentPage < this.totalPagesArray.length ) {
      this.currentPage++;
      this.getAllOrganizerEvents(this.currentPage);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;

      this.getAllOrganizerEvents(this.currentPage);

    }

  }

  changePage(pageNumber: number) {
    this.getAllOrganizerEvents(pageNumber);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.pageDataResponse?.totalPages ||  0}, (_, i) => i+1);

  }

  get totalElements(): number {
    return this.pageDataResponse?.totalElements ?? 0;
  }

  toggleDropdown(index: number) {
    this.isDropdownVisible[index] = !this.isDropdownVisible[index];
  }

  orgUpdateEvent(eventId: number) {
    this.router.navigate(['/org-update-event/' + eventId]);
  }

  deleteEvent(eventId: number, index: number) {
    this.eventService.deleteEvent(eventId).subscribe({
      next: (response: PageResponse) => {
        this.notificationService.showSuccess(response.message);
        this.records = this.records.filter(event => event.eventId !== eventId);

        this.data = this.records;
        this.updatePage();
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });

    this.isDropdownVisible[index] = false;
  }


  viewEvent(eventId: number) {
    this.router.navigate([`/org-preview-page/${eventId}`]);

  }

  viewAttendee(eventId: number) {
    this.router.navigate([`/org-view-attendees/${eventId}`]);

  }

  isActionMenuOpen: boolean = false;
  selectedItemId!: number;
  isModalVisible = false;

  cancelState() {
    this.isModalVisible = false;
  }
  confirmState() {


  }

}






