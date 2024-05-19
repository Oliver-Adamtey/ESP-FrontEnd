import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SettingTexts, settingImages } from './texts';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '../../../../services/Organizer/Settings/settings.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../../../environments/environment';


SettingTexts
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [

RouterModule,
ReactiveFormsModule,
CommonModule,
RouterLink,

  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

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


  orgSetti: FormGroup;
  data: any;
  errormessage: string = "provide valid credentials";
  isError: boolean = false;
  isSubmitted: boolean = false;

  constructor(private router: Router, private orgSettings_: SettingsService, @Inject(PLATFORM_ID) private platformId: Object) {

    this.orgSetti = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    });

  }
  onSubmit() {
    if (this.orgSetti.valid) {
      const postData = this.orgSetti.value;
      this.orgSettings_.orgSettings_(postData).subscribe({
        next: (response) => {
          this.isSubmitted = true;
          console.log('Settings successfully updated', response);
          alert('Settings successfully updated');

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(environment.ORGANIZER_TOKEN, response.token);
          }

        },
        error: (error) => {
          console.error('Error updating settings:', error);
          if (error && error.error && error.error.businessErrorDescription === "Login and password is incorrect") {
            this.isError = true;
            alert('Login or password is incorrect');
          } else if (error && error.error && error.error.businessErrorDescription === "User account is locked") {
            alert('User account is locked, click on forgot password');
          } else {
            console.log("An error occurred while updating settings. Please try again later");
            alert('An error occurred due to account activation');
          }
        }
      });
    } else {
      this.isError = true;
    }
  }


  orgEvent() {
    this.router.navigate(['/org-event']);
  }
  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);

  }
  orgDash() {
    this.router.navigate(['/org-dash']);
  }

  orgUsers() {
    this.router.navigate(['/org-users'])

  }

  logout() {

    const confirmLogOut = window.confirm('Are you sure you want to logout?');
    if (confirmLogOut) {
      localStorage.removeItem(environment.ORGANIZER_TOKEN);
      localStorage.clear();
      this.router.navigate(['/login']);

    }

  }


  users() {
    this.router.navigate(['/org-users'])

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
    this.router.navigate(['/org-settings']);
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
