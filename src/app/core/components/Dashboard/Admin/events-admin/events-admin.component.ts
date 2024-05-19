import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventAdminService } from '../../../../services/Admin/event-admin/event-admin.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-events-admin',
  standalone: true,
  imports: [

    CommonModule,
    RouterLink,


  ],
  templateUrl: './events-admin.component.html',
  styleUrl: './events-admin.component.css'
})
export class EventsAdminComponent {



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

  Filters: string = 'Filters'
  Free: string = 'Free'
  Paid: string = 'Paid'
  CreateEvent: string = 'Create event'
  FirstEvent: string = 'Create your first event'
  CreateEventThisPage: string = 'Create events on this page'

  Event: string = 'Event';
  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  subTitle: string = 'Plan and manage your gatherings effortlessly.'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'

  eventCreated: boolean = true
  eventNotCreated: boolean = false

  constructor(private router: Router, private getEventService: EventAdminService) { }

  adminEvent() {
    this.router.navigate(['/admin-event']);
  }

  adminDash() {
    this.router.navigate(['/admin-dash']);
  }

  adminUsers() {
    this.router.navigate(['/admin-users'])

  }
  adminCreateEvent() {
    this.router.navigate(['/admin-create-event'])

  }

  logout(){

    const confirmLogOut = window.confirm('Are you sure you want to logout?');

    if(confirmLogOut){
      if(!localStorage==undefined){
      localStorage.removeItem(environment.ADMIN_TOKEN);
      localStorage.clear();
      this.router.navigate(['/login']);

    }
  }
  }

  events: any[] = [];
  eventsSubscription: Subscription | undefined;

  accountSettings() {
    this.router.navigate(['/admin-settings']);

  }

  profile: boolean = false;
  email= 'ekumkofi@example.com';

  toggleCard() {

    this.profile = !this.profile
    // this.router.navigate(['/login']);

  }

}
