import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { JwtDecoderService } from '@services/Organizer/JWT-Token/jwt-decoder.service';
import { EventService } from '@services/Organizer/event/event.service';
import { NotificationService } from '@notifications//notification.service';
import { CreatedEventService } from '@services/Organizer/created-event/created-event.service';
import { CommonModule } from '@angular/common';
import { OrganizerDashComponent } from "@component/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "@component/Organizer/organizer-top-bar/organizer-top-bar.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloadGeneralComponent } from "@component/preload-general/preload-general.component";
import { OrganizerCreateEventBarComponent } from "@component/Organizer/organizer-create-event-bar/organizer-create-event-bar.component";
import { Co_Organizer } from '@interface/Organizer-filtering/records';
import { ActivateCoOrgService } from '@services/Organizer/Activate_Co-Org/activate-co-org.service';
import { environment } from '@environments/environment';
import { AttendeeDetails, EventObject, PageableResponse, PageableResponseAttendee, viewAttendeeDetails } from '@interface/create-event/organizer';
import { GetUsersService } from '@services/Organizer/get-users/get-users.service';

@Component({
  selector: 'app-event-attendees',
  standalone: true,
  imports: [
    CommonModule,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    FormsModule,
    PreloadGeneralComponent,
    OrganizerCreateEventBarComponent,
    ReactiveFormsModule,
    RouterLink,


  ],

  templateUrl: './event-attendees.component.html',
  styleUrl: './event-attendees.component.css'
})
export class EventAttendeesComponent {




  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
  CardImg: string = 'assets/esp/dashboard/event-created.png'

  SearchImg: string = 'assets/esp/dashboard/search.png'
  FilterImg: string = 'assets/esp/dashboard/filter.png'
  userPlus: string = 'assets/esp/dashboard/user-plus.png'

  Filters: string = 'Filters'
  Free: string = 'Free'
  Paid: string = 'Paid'
  inviteUser: string = 'Invite user'
  inviteFirst: string = 'Invite your first user'
  addUsers: string = 'Add users on this page'

  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'


  eventCreated: boolean = false
  eventNotCreated: boolean = false

  eventdetails: boolean = false;
  preload: boolean = false;
  createEvent_: boolean = false;
  displayUsers: boolean = false;
  records!: viewAttendeeDetails[]

  filteredSupplier: Array<EventObject> = [];
  displayedSuppliers: Array<EventObject> = [];
  currenPage: number = 0;
  pageSize: number = 10;
  filterByCategory: string = '';
  isDropdownVisible: boolean[] = [];
  profile: boolean = false;
  email = '';
  currentPage: number = 1;
  role: string = 'Attendee';
  heading = 'Events';
  sub_heading = 'Plan and manage your gatherings effortlessly.';
  eventId!:number

  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtDecodeService: JwtDecoderService,
    private eventService: EventService,
    private eventAttendee: GetUsersService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) { }


  isDiscardModalVisible: boolean = false;

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
    this.route.url?.subscribe((urlSegments) => {
     const path = urlSegments.map((segment) => segment.path).join('/');
     if (path.startsWith('org-view-attendees')) {
        this.eventId = +urlSegments[1].path;
       this.viewEventAttendees(this.currenPage)
     }
   });
 }


  updateDisplayedSuppliers() {
    const startIndex = (this.currenPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedSuppliers = this.filteredSupplier.slice(startIndex, endIndex);
  }

  noResultsFound: boolean = false;

  pageableResponseAttendee?: PageableResponseAttendee

  toggleDropdown(index: number) {
    this.isDropdownVisible[index] = !this.isDropdownVisible[index];
  }

  orgUpdateEvent(eventId: number) {
    this.router.navigate(['/org-update-event/' + eventId]);
  }

  viewEventAttendees(currentPage: number, search?: string, category?: string) {
    this.eventAttendee.getEventsAttendees(this.eventId,currentPage, this.pageSize, search, category).subscribe({
      next: (response: PageableResponseAttendee) => {
        this.records = response.content;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });

  }

  changePage(pageNumber: number) {
    this.viewEventAttendees(pageNumber);

  }


  get totalPagesArray(): number[] {
    return Array.from({ length: this.pageableResponseAttendee?.totalPages || 1 }, (_, i) => i);

  }

  nextPage() {

    if (this.currenPage < this.totalPagesArray.length - 1) {
      this.currenPage++;
      this.viewEventAttendees(this.currenPage);
    }
  }

  previousPage() {
    if (this.currenPage > 0) {
      this.currenPage--;

      this.viewEventAttendees(this.currenPage);

    }

  }

  get totalElements(): number {
    return this.pageableResponseAttendee?.totalElements ?? 0;
  }



}


