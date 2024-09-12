import { Component, inject } from '@angular/core';
import { NotificationBellComponent } from "../../core/components/Dashboard/Attendee/notification-bell/notification-bell.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { NotificationService } from '@notifications//notification.service';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [
    NotificationBellComponent,
    CommonModule
  ],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {

  profileSubscription!: Subscription;
  profileImageUrl = '';
  fullName = sessionStorage.getItem('fullName');
  lastName = '';
  firstName = '';
  email = '';

  router = inject(Router);
  eventService = inject(GetEventService);
  notificationService = inject(NotificationService)

  ngOnInit(): void {
    this.loadUserProfile()  
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileSubscription = this.eventService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.lastName = profile.lastName;
          this.email = profile.email;
          this.firstName = profile.firstName;
          this.fullName = `${this.firstName} ${this.lastName}`;
        }
      });
      this.eventService.loadUserProfile(userId);
    } else {
      this.notificationService.showError('User ID not found');
    }
  }

  showProfileCard: boolean = false;
  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }
  accountSettings() {
    this.router.navigate(['/attendee-settings']);
  }

}
