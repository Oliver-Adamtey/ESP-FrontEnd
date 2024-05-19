import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SettingTexts, settingImages } from './texts';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-settings-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './settings-admin.component.html',
  styleUrl: './settings-admin.component.css'
})
export class SettingsAdminComponent {


  SettingTexts = SettingTexts
  settingImages = settingImages


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

  settings: string = 'Settings';
  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  subTitle: string = 'Plan and manage your gatherings effortlessly.'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'


  eventCreated: boolean = true
  eventNotCreated: boolean = false

  modal = false

  venueLayoutUrl: string | ArrayBuffer | null = null;


  constructor(private router: Router) { }

  adminEvent() {
    this.router.navigate(['/admin-event']);
  }
  adminCreateEvent() {
    this.router.navigate(['/admin-create-event']);

  }
  adminDash() {
    this.router.navigate(['/admin-dash']);
  }

  adminUsers() {
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
    this.router.navigate(['/admin-invite']);
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

  locationImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const fileSize = input.files[0].size;
      const maxSize = 10 * 1024 * 1024;

      if (fileSize > maxSize) {
        console.log("File size exceeds the maximum allowed size of 10 MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.venueLayoutUrl = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }


}
