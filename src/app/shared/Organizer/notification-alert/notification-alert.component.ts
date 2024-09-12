import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationData, NotificationResponse } from '@interface/Organizer/notification';
import { NotificationsAlertService } from '@services/Organizer/NotificationsAlert/notifications-alert.service';
import { ProfileDataService } from '@services/Organizer/Profile_Data/profile-data.service';
import { NotificationService } from 'app/notification-service/notification.service';

@Component({
  selector: 'app-notification-alert',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification-alert.component.html',
  styleUrl: './notification-alert.component.css'
})
export class NotificationAlertComponent {


constructor(private router: Router,
  private ProfileDataService: ProfileDataService,
  private notificationService: NotificationService,
  private notoficationAlert: NotificationsAlertService,
) {}



  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  bell: boolean = false;
  toggle:boolean = false
  toggleBell:boolean = false
  profile: boolean = false;
  isLogoutModalVisible = false;
  readId!: number
  navBarName: string = sessionStorage.getItem("organizerName") || ''
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
  NavBarImg = 'assets/esp/dashboard/avatar.png'

  toggleBellCard() {

    this.bell = !this.bell
    this.toggleBell =!this.toggleBell
    this.profile = false

  }
  toggleCard() {

    this.profile = !this.profile
    this.toggle =!this.toggle
    this.bell = false
  }

  markAllRead() {
    this.notoficationAlert.readAllNotification().subscribe({
      next: (response) => {
        this.getUnReadNotification();
        this.getUnreadNotificationCount()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });

  }

  getUnreadNotificationCount(): number {
    return this.UnreadNotificationData.length;
  }

  ReadNotification(notificationId: number) {
    this.notoficationAlert.ReadNotification(notificationId).subscribe({
      next: (response) => {

        this.isLogoutModalVisible = true
        this.readId = notificationId

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });

  }

  UnreadNotificationData!: NotificationData[]

  getUnReadNotification() {
    this.notoficationAlert.getUnReadNotification().subscribe({
      next: (response: NotificationResponse) => {
        this.UnreadNotificationData = response.content

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);

      }
    });

  }

  viewAllNotification() {
    this.router.navigateByUrl('/org-view-all-notification');

  }


}
