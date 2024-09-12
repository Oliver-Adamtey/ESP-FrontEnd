import { AdminProfile } from '@interface/Admin/getAllUsers';
import { Component, EventEmitter, Inject, Output, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SettingsService } from '@services/org-settings/settings.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@environments/environment';
import { OrganizerDashComponent } from "@component/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "@component/Organizer/organizer-top-bar/organizer-top-bar.component";

import { SettingTexts, settingImages } from './texts';
import { SuccessComponent } from "@component/login-error-handling/success/success.component";
import { UnauthorizedComponent } from "@component/login-error-handling/unauthorized/unauthorized.component";
import { InvalidPasswordComponent } from "@component/login-error-handling/invalid-password/invalid-password.component";
import { ViewProfileResponse, ViewProfileResponseData } from '@interface/service/interface';
import { NotificationService } from '@notifications//notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountSettingsImageProcessingService } from '../../../../services/Organizer/Account Settings Image Processing/account-settings-image-processing.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    SuccessComponent,
    UnauthorizedComponent,
    InvalidPasswordComponent
  ]
})
export class SettingsComponent {




  heading = "Settings"
  sub_heading = "Plan and manage your gatherings effortlessly."
  personalInfo = "Personal Info"
  updatePhoto = "Update your photo and personal details."
  firstNameLabel = "First Name"
  lastNameLabel = "Last Name"
  imageSpec = "SVG, PNG, JPG or GIF (max. 800x400px)"

  SettingTexts = SettingTexts;
  settingImages = settingImages;
  fullName = '';
  firstName = '';
  lastName = '';
  email = '';
  profileImageUrl = '';
  showProfileCard: boolean = false;
  selectedFile: File | null = null;

  profileImage: string | null = null;

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

  isSubmitted: boolean = false;
  unAuthorized: boolean = false;
  isIncorrect: boolean = false;
  loading: boolean = false;


  modal = false

  venueLayoutUrl: string | ArrayBuffer | null = null;

  organizerAccountForm: FormGroup;
  data: any;
  isError: boolean = false;
  success = 'profile updated successfully'
  errorMessage = 'Update atleast one field'

  constructor(
    private router: Router,
    private orgSettings_: SettingsService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private notificationService: NotificationService,
    private fileProcessingService: AccountSettingsImageProcessingService
  ) {

    this.organizerAccountForm = new FormGroup({
      email: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(""),
      profileImageUrl: new FormControl("",)
    });

    this.fileProcessingService.profileImage$.subscribe((image) => {
      if (image) {
        this.profileImageUrl = image;
        this.organizerAccountForm.get('profileImageUrl')?.setValue(image);
      }
    });
  }

  getProfileImage(image: string) {
    this.profileImageUrl = image;
    this.organizerAccountForm.get('profileImageUrl')?.setValue(image);
  }

  onFileSelected(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileProcessingService.processFile(file, controlName);
      this.fileProcessingService.uploadFile(file);
    }
  }

  onDrop(event: DragEvent, controlName: string): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.fileProcessingService.processFile(file, controlName);
      this.fileProcessingService.uploadFile(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer!.dropEffect = 'copy';
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onSubmit() {
    if (this.organizerAccountForm.valid) {
      this.loading = true;
      const postData = this.organizerAccountForm.value;
      this.orgSettings_.orgSettings_(postData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Profile successfully updated');
          sessionStorage.setItem('organizerName', `${this.organizerAccountForm.get('firstName')?.value} ${this.organizerAccountForm.get('lastName')?.value}`);
          this.isSubmitted = true;
          this.loading = false;

          setTimeout(() => {
            this.router.navigateByUrl('/org-dash');
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
          this.isError = true;
          this.loading = false;
        },
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


  toggleCard() {

    this.profile = !this.profile


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
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.venueLayoutUrl = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }




  saveChanges(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return;
    }

  }




  cancel(): void {
    this.isLogoutModalVisible = true;

  }


  isLogoutModalVisible = false;

  cancelDiscard() {
    this.isLogoutModalVisible = false;
  }

  confirmDiscard() {
    this.isLogoutModalVisible = false;
    this.router.navigate(['/org-dash']);
  }


  ngOnInit() {

    this.viewProfile()

    const orgEmail = sessionStorage.getItem('OrgEmail');
    const orgFirstName = sessionStorage.getItem('firstName');
    const orgLastName = sessionStorage.getItem('lastName');
    const orgProfileImageUrl = sessionStorage.getItem('profileImageUrl');

  }


  profilImage = sessionStorage.getItem('profileImage')

  viewProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.orgSettings_.viewProfile(userId).subscribe(
        (response: ViewProfileResponse) => {
          const data = response.data;
          this.organizerAccountForm.get('email')?.patchValue(data.email)
          this.organizerAccountForm.get('firstName')?.patchValue(data.firstName)
          this.organizerAccountForm.get('lastName')?.patchValue(data.lastName)
          this.organizerAccountForm.get('profileImageUrl')?.patchValue(data.profileImageUrl)
          this.profileImage = data.profileImageUrl;
        },
        (error) => {
          this.notificationService.showError('Error receiving notifications');

        }
      );
    } else {
      this.notificationService.showError('Error receiving notifications');

    }
  }






}





