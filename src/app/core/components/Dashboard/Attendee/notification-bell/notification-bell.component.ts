import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationData, NotificationResponse } from '@interface/Organizer/notification';
import { NotificationService } from '@notifications//notification.service';
import { NotificationsAlertService } from '@services/Organizer/NotificationsAlert/notifications-alert.service';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export class NotificationBellComponent implements OnInit {
  notifications: NotificationData[] = [];
  showDropdown = false;
  notificationsRead = false;

  private notificationsAlertService = inject(NotificationsAlertService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  notificationService = inject(NotificationService);

  ngOnInit(): void {
    this.checkLocalStorage();
    if (!this.notificationsRead) {
      this.fetchNotifications();
    }
  }

  ngOnDestroy(): void {
    this.notificationsAlertService.unsubscribe();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown && !this.notificationsRead) {
      this.fetchNotifications();
    }
  }

  markAllAsRead(): void {
    this.notificationsAlertService.readAllNotification().subscribe(() => {
      this.notifications.forEach(notification => notification.read = true);
      this.notifications = [];
      this.notificationsRead = true;
      localStorage.setItem('notificationsRead', 'true');
      this.cdr.detectChanges();
      this.notificationService.showSuccess('Read all Successful');
    });
  }

  navigateAllNotifications(notification: NotificationData): void {
    this.router.navigate(['/all-notifications']);
  }

  viewAllNotifications(): void {
    this.router.navigate(['/all-notifications']);
  }

  private fetchNotifications(): void {
  this.notificationsAlertService.getUnReadNotification().subscribe(
    (response) => {
      this.notifications = response.content;
      this.notificationsRead = false;
      localStorage.removeItem('notificationsRead');
      this.cdr.detectChanges();
    },
    (error) => {
      this.notificationService.showError('Failed to load unread notifications');
    }
  );
}


  private checkLocalStorage(): void {
    const readStatus = localStorage.getItem('notificationsRead');
    if (readStatus === 'true') {
      this.notificationsRead = true; 
    }
  }
  
}