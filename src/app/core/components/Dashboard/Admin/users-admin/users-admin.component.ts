import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersAdminInviteComponent } from "./users-admin-invite/users-admin-invite.component";
import { CommonModule } from '@angular/common';
import { AllUsersService } from '../../../../services/Admin/All Users/all-users.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';


@Component({
  selector: 'app-users-admin',
  standalone: true,
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css',
  imports: [UsersAdminInviteComponent, CommonModule]
})



export class UsersAdminComponent {



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

  Filters: string = 'Filter by role'
  admin: string = 'Admin'
  Attendee: string = 'Attendee'
  Organizer: string = 'Organizer'

  inviteUser: string = 'Invite admin'
  inviteFirst: string = 'Invite your first user'
  addUsers: string = 'Add users on this page'

  userManage: string = 'User management';
  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  subTitle: string = 'Manage Co-organizers and venue staff here.'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'


  eventCreated: boolean = true
  eventNotCreated: boolean = false

  modal = false


  constructor(private router: Router, private allUsers: AllUsersService, private http: HttpClient) { }

  adminOrgEvent() {
    this.router.navigate(['/admin-event']);
  }
  AdminOrgCreateEvent() {
    this.router.navigate(['/admin-create-event']);

  }
  orgDash() {
    this.router.navigate(['/admin-dash']);
  }

  orgUsers() {
    this.router.navigate(['/admin-users'])

  }

  logout(){

    const confirmLogOut = window.confirm('Are you sure you want to logout?');

    if(confirmLogOut){
      if(!localStorage==undefined){
      localStorage.removeItem(environment.ADMIN_TOKEN);
      localStorage.clear();
      this.router.navigate(['/login']);

    }}

  }


  users() {
    this.router.navigate(['/admin-users'])

  }

  userInvite() {
    this.router.navigate(['/user-invite']);
  }

  openModal() {
    this.modal = true
  }

  closeModal() {
    this.modal = !this.modal
  }

  profile: boolean = false
  email = 'ekumku@example.com'

  toggleCard() {

    this.profile = !this.profile
    // this.router.navigate(['/login']);

  }

  threeButtonAction: boolean = false

  actionMenu() {

    this.threeButtonAction = !this.threeButtonAction

  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);

  }

  records: any[] = [];

  displayUsers: boolean = false

  ngOnInit(): void {
    this.http.get<any[]>(environment.GET_ALL_USERS).subscribe({
      next: (response: any[]) => {
        this.records = response;
        this.displayUsers = true;
        console.log(this.records);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  onFilterChange(event: any){

console.log(event.target.value);

  }



}
