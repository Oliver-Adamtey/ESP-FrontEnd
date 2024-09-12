import { Component } from '@angular/core';
import { OrganizerCreateEventBarComponent } from "../organizer-create-event-bar/organizer-create-event-bar.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../notification-service/notification.service';
import { NotificationsAlertService } from '../../../core/services/Organizer/NotificationsAlert/notifications-alert.service';
import { ProfileDataService } from '../../../core/services/Organizer/Profile_Data/profile-data.service';
import { NotificationData, NotificationResponse } from '../../../core/Interface/Organizer/notification';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationDataPageResponse, PageDataResponse } from '@interface/registration/login-register';
import { NotificationSearch } from '@interface/Organizer-filtering/records';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-notification',
  standalone: true,
  imports: [
    OrganizerCreateEventBarComponent,
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './view-all-notification.component.html',
  styleUrl: './view-all-notification.component.css'
})
export class ViewAllNotificationComponent {

  EventProgressImg: string = 'assets/esp/dashboard/event-create-back.png';
  BackToEvent: string = 'Back';
  isDiscardModalVisible = false;
  isLogoutModalVisible = false;
  readId!: number


  constructor(
    private router: Router,
    private ProfileDataService: ProfileDataService,
    private notificationService: NotificationService,
    private notoficationAlert: NotificationsAlertService,
  ) {

  }

  records!: NotificationSearch[];


  showDiscardConfirmation() {
    this.isDiscardModalVisible = true;
  }

  ngOnInit() {
    this.searchNotification()
    this.getAllNotification();
    this.isLogoutModalVisible = false;
  }

  searchNotification(search?: string) {
    this.notoficationAlert.searchNotifications(search).subscribe({
      next: (response: NotificationDataPageResponse) => {
        this.records = response.content
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    })
  }

  cancelDiscard() {
    this.isDiscardModalVisible = false;
  }

  confirmDiscard() {
    this.isDiscardModalVisible = true;
    this.router.navigate(['/org-event']);
  }


  NotificationData!: NotificationData[]

  getAllNotification() {
    this.notoficationAlert.getAllNotification().subscribe({
      next: (response: NotificationResponse) => {
        this.NotificationData = response.content
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });

  }

  UnreadNotificationData!: NotificationData[]

  getUnreadNotificationCount(): number {
    return this.UnreadNotificationData.length;
  }

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
  ReadNotification(notificationId: number) {
    this.notoficationAlert.ReadNotification(notificationId).subscribe({
      next: (response) => {
        this.getAllNotification()
        this.NotificationData
        this.isLogoutModalVisible = true
        this.readId = notificationId

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });

  }

  cancelLogout() {

    this.isLogoutModalVisible = false;
  }

  isDeleteMode: boolean = false;
isSelectMode: boolean = false;
selectedItemIds: Set<number> = new Set<number>();

selectNotification() {
  this.isSelectMode = !this.isSelectMode;

  if (this.isDeleteMode) {
    this.cancelDelete();
  }
}

selectedValueNotification!: [];

toggleDeleteMode(itemId: number) {
  if (this.selectedItemIds.has(itemId)) {
    this.selectedItemIds.delete(itemId);
  } else {
    this.selectedItemIds.add(itemId);
  }
}

markAllRead() {

  this.notoficationAlert.readAllNotification().subscribe({
    next: (response) => {
      this.notificationService.showSuccess('All notifications marked as read');
      this.searchNotification()
    },
    error: (error: HttpErrorResponse) => {
      this.notificationService.showError(error.error.message);
    }
  });


}



getSelectedIdsString(): string {
  return Array.from(this.selectedItemIds).join(', ');
}


cancelDelete() {
  this.isDeleteMode = false;
  this.isSelectMode = false;
  this.selectedItemIds.clear();
}

confirmDelete(){
  if(this.selectedItemIds.size > 0){
    this.isDeleteMode = true;


  }else{
    this.isDeleteMode = false;
      this.notificationService.showError("No notification selected");


  }
}

deleteNotification(){
  if(this.selectedItemIds.size > 0){
    this.isDeleteMode = true;

  }

  if (this.selectedItemIds.size > 0) {
    const idsArray = Array.from(this.selectedItemIds);
    this.notoficationAlert.deleteMultipleNotifications(idsArray)

      .subscribe({
        next: (response) => {
          this.searchNotification();
          if(this.selectedItemIds.size === 1){
            this.notificationService.showSuccess('Notification deleted successfully');
          }else if(this.selectedItemIds.size > 1){
            this.notificationService.showSuccess('Notifications deleted successfully');
          }
          this.selectedItemIds.clear();
          this.isDeleteMode = false;
          this.isSelectMode = false;
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.showError(error.error.message);
        }
      });
  }
}




}





