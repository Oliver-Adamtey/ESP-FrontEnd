import { Component } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Router } from '@angular/router';
import { JwtDecoderService } from '../../../../services/Organizer/JWT-Token/jwt-decoder.service';
import { HttpClient } from '@angular/common/http';
import { PreloadGeneralComponent } from "../../../../../shared/preload-general/preload-general.component";
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'

@Component({
    selector: 'app-attendee-event',
    standalone: true,
    templateUrl: './attendee-event.component.html',
    styleUrl: './attendee-event.component.css',
    imports: [
      PreloadGeneralComponent,
      CommonModule,
      MatDatepickerModule,
      MatNativeDateModule
    ]
})
export class AttendeeEventComponent {


  eventCreated: boolean = false
  eventNotCreated: boolean = false


  constructor(
    private router: Router,
    private http: HttpClient, private jwtDecodeService: JwtDecoderService
  ) {}

  orgEvent() {
    this.router.navigate(['attendee']);
  }
  orgDash() {
    this.router.navigate(['/attendee']);
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
  // eventsSubscription: Subscription | undefined;

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


    if(!localStorage == null){

    }
    const token = localStorage.getItem(environment.ATTENDEE_TOKEN);
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

  fullName = localStorage.getItem('fullName')

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);

  // myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //   return day !== 0 && day !== 6;
  // }

}
