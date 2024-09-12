import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { allEventdetails, FreeCheckoutData } from '@interface/all-eventdetails/all-eventdetails';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { NotificationService } from '@notifications//notification.service';
import { ToastrService } from 'ngx-toastr';
import { AllUsersResponse } from '@interface/Admin/getAllUsers';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationBellComponent } from "../../core/components/Dashboard/Attendee/notification-bell/notification-bell.component";
import { PageResponse } from '@interface/registration/login-register';
import { TopNavbarComponent } from "../../pages/top-navbar/top-navbar.component";

@Component({
  selector: 'app-attendee-free-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NotificationBellComponent,
    TopNavbarComponent
],
  templateUrl: './attendee-free-checkout.component.html',
  styleUrl: './attendee-free-checkout.component.css',
})
export class AttendeeFreeCheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('registrationForm') registrationForm!: NgForm;

  profileSubscription!: Subscription;
  profileImageUrl = '';
  fullName = sessionStorage.getItem('fullName');
  lastName = '';
  firstName = '';
  phone: string = sessionStorage.getItem('phone') || '';
  email = '';
  eventId: string = '';
  userId: string = '';


  constructor(
    private eventService: GetEventService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.fullName = `${this.firstName} ${this.lastName}`;

    this.loadUserProfile()
    this.userId = sessionStorage.getItem('userId') || '';
    this.route.paramMap?.subscribe(params => {
      this.eventId = params.get('eventId') || '';
    });
  }

  onSubmit(registrationForm: NgForm) {
    if (registrationForm.invalid) {
      this.notificationService.showError('Fill out all required fields & match requirments');
      return;
    }
    
    if (this.eventId && this.userId && registrationForm.valid) {
      const infoData: FreeCheckoutData = {
        name: this.fullName,
        email: this.email,
        phone: this.phone,
      };

      this.eventService.sendFreeCheckoutDetails(this.eventId, this.userId, infoData).subscribe({
        next:(response:AllUsersResponse) => {
          this.notificationService.showSuccess('Event Registration Successfully, Check your Email');
         this.router.navigate([`/my-events`]);
        },
        error: (error: HttpErrorResponse) => {
          const registerEventError:PageResponse = error.error;
          this.notificationService.showError('You have already registered for this event.');
        }
      })
    }
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

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
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
