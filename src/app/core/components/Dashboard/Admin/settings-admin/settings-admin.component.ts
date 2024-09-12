import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SettingTexts, settingImages } from './texts';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttendeeProfile } from '@interface/all-eventdetails/all-eventdetails';
import { NotificationService } from '@notifications//notification.service';
import { AdminSidebarComponent } from "@component/admin-sidebar/admin-sidebar.component";
import { AllUsersService } from '@services/Admin/All Users/all-users.service';
import { AdminProfile } from '@interface/Admin/getAllUsers';
import { NotificationBellComponent } from '@components/Dashboard/Attendee/notification-bell/notification-bell.component';

@Component({
    selector: 'app-settings-admin',
    standalone: true,
    templateUrl: './settings-admin.component.html',
    styleUrl: './settings-admin.component.css',
    imports: [
        CommonModule,
        RouterLink,
        ReactiveFormsModule,
        FormsModule,
        AdminSidebarComponent,
        NotificationBellComponent
    ]
})
export class SettingsAdminComponent implements OnInit {

  SettingTexts = SettingTexts;
  settingImages = settingImages;
  fullName = '';
  firstName = '';
  lastName = '';
  email = '';
  profileImageUrl: string = '';
  showProfileCard: boolean = false;
  profileData: AdminProfile | null = null;
  selectedFile: File | null = null;
  activeTab: string = 'account-settings';

  constructor(
    private router: Router, 
    private allUsersService: AllUsersService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.allUsersService.getAdminProfile(userId).subscribe({
        next: (res) => {
          this.profileData = res.data;
          this.populateProfileData();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError('Error fetching profile data:');
        }
      });
    } else {
      this.notificationService.showError('User Id not found');
    }
  }

  populateProfileData() {
    if (this.profileData) {
      this.fullName = `${this.profileData.firstName} ${this.profileData.lastName}`;
      this.firstName = this.profileData.firstName;
      this.lastName = this.profileData.lastName;
      this.email = this.profileData.email;
      this.profileImageUrl = this.profileData.profileImageUrl;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          this.profileImageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }
  
  saveChanges(): void {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return;
    }
  
    const updatedProfile: Partial<AdminProfile> = {
      firstName: this.firstName,
      lastName: this.lastName,
      profileImageUrl: this.profileImageUrl
    };

    this.allUsersService.updateAdminProfile(userId, updatedProfile).subscribe({
       next: (response ) => {
          this.populateProfileData();
          this.notificationService.showSuccess('Profile updated successfully');
      },
      error: () => {
        let errorMessage = 'Error updating profile. Please try again.';
        this.notificationService.showError(errorMessage);
      }
    });
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

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer!.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profileImageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  cancel(): void {
    this.populateProfileData();
  }

  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }


  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}
