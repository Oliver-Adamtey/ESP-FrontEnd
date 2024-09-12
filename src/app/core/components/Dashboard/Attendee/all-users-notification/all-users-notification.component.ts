import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationData } from '@interface/Organizer/notification';
import { NotificationService } from '@notifications//notification.service';
import { NavigationService } from '@services/navigationservice/navigation.service';
import { NotificationsAlertService } from '@services/Organizer/NotificationsAlert/notifications-alert.service';
import { Subscription } from 'rxjs';
import { TopNavbarComponent } from "../../../../../pages/top-navbar/top-navbar.component";

@Component({
  selector: 'app-all-users-notification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TopNavbarComponent
],
  templateUrl: './all-users-notification.component.html',
  styleUrl: './all-users-notification.component.css'
})
export class AllUsersNotificationComponent {
  profileSubscription!: Subscription;
  notifications: NotificationData[] = [];
  profileImageUrl = '';
  fullName = sessionStorage.getItem('fullName');
  lastName = '';
  firstName = '';
  email = '';
  searchText: any;
  notificationsRead = false;
  selectedNotifications: number[] = [];


  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  notificationService = inject(NotificationService);
  navigationService = inject(NavigationService)
  private notificationsAlertService = inject(NotificationsAlertService);

  ngOnInit(): void {
    this.fetchNotifications();
  }
  
  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  private fetchNotifications(): void {
    this.notificationsAlertService.getAllNotification().subscribe(
      (response) => {
        this.notifications = response.content;
      }
    )
  }

  markAllAsRead(): void {
    this.notificationsAlertService.readAllNotification().subscribe(() => {
      this.notifications.forEach(notification => notification.read = true);
      this.notificationsRead = true;
      localStorage.setItem('notificationsRead', 'true');
      this.cdr.detectChanges();
      this.notificationService.showSuccess('Read all Successful');
    });
  }

  markAsReadAndNavigate(notification: NotificationData): void {
    notification.read = true; 
    this.notifications = this.notifications.filter(n => n !== notification);
    this.cdr.detectChanges(); 
    this.notificationService.showSuccess('Notification read');
    this.router.navigate(['/all-notifications']); 
  }

  markAsRead(notification: NotificationData): void {
    notification.read = true; 
    this.notificationService.showSuccess('Notification marked as read');
    this.cdr.detectChanges(); 
  }
  
  toggleNotificationSelection(notificationId: number): void {
    const index = this.selectedNotifications.indexOf(notificationId);
    if (index > -1) {
      this.selectedNotifications.splice(index, 1);
    } else {
      this.selectedNotifications.push(notificationId);
    }
  }
  

  deleteNotifications(): void {    
    if (this.selectedNotifications.length > 0) {
      this.notificationsAlertService.deleteMultipleNotifications(this.selectedNotifications)
        .subscribe(
          (response) => {
            this.notifications = this.notifications.filter(notification => !this.selectedNotifications.includes(notification.id));
            this.selectedNotifications = [];
            this.cdr.detectChanges();
            this.notificationService.showSuccess('Selected notifications deleted successfully.');
          },
        );
    } else {
      this.notificationService.showError('Please select at least one notification to delete.');
    }
  }
  
  
  goBack(): void {
    this.navigationService.back(); 
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }
}
