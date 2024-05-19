
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreatedEventService } from '../../../../../services/Organizer/created-event/created-event.service';
import { JwtDecoderService } from '../../../../../services/Organizer/JWT-Token/jwt-decoder.service';
import { PreloadGeneralComponent } from "../../../../../../shared/preload-general/preload-general.component";
import { UserPaginationComponent } from "../../../../../../shared/Organizer/pagination/user-pagination.component";



@Component({
    selector: 'app-event',
    standalone: true,
    templateUrl: './event.component.html',
    styleUrl: './event.component.css',
    imports: [
        CommonModule,
        RouterLink,
        PreloadGeneralComponent,
        UserPaginationComponent
    ]
})
export class EventComponent {


  eventCreated: boolean = false
  eventNotCreated: boolean = false






  constructor(
    private router: Router, private CreatedEventService: CreatedEventService,
    private http: HttpClient, private jwtDecodeService: JwtDecoderService
  ) {}

  orgEvent() {
    this.router.navigate(['/org-event']);
  }
  orgDash() {
    this.router.navigate(['/org-dash']);
  }

  orgUsers() {
    this.router.navigate(['/org-users'])

  }
  orgCreateEvent() {
    this.router.navigate(['/org-create-event'])

  }

  logout() {

    const confirmLogOut = window.confirm('Are you sure you want to logout?');
    if (confirmLogOut) {
      this.router.navigate(['/login']);
      localStorage.clear();


    }

  }

  events: any[] = [];
  eventsSubscription: Subscription | undefined;

  accountSettings() {
    this.router.navigate(['/org-settings']);
  }
  profile: boolean = false;
  email = '';
  toggleCard() {

    this.profile = !this.profile

  }

  records: any[] = [];
  displayUsers: boolean = false;
  preload: boolean = false;
  decodedToken: any;
  createEvent_: boolean = true

  ngOnInit(): void {
    const token = localStorage.getItem(environment.ORGANIZER_TOKEN);
    const userId = localStorage.getItem(environment.USER_ID);

    if (!token || !userId) {
      console.error('User Id not found');
      return;
    }

    this.decodedToken = this.jwtDecodeService.decodeToken(token);

    const endpoint = `${environment.GET_ALL_ORG_EVENTS_CREATED}/${userId}`;
    this.preload = true;
    this.createEvent_ = false
    this.http.get<any>(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }


    }).subscribe({
      next: (response: any) => {
        this.preload = false;
        this.createEvent_ = false
        this.records = response.content[0];
        console.log(this.records);
        this.displayUsers = true;
        this.eventCreated = true;

      },
      error: (err: any) => {
        console.error(err);
        this.preload = true;
        this.createEvent_ = true;
      }
    });
  }

  onFilterChange(event: any) {

    console.log(event.target.value);

  }




}
