import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { GetEventService } from '@services/Attendee Service/get-event.service';
import { NotificationService } from '@notifications//notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewEventdetails } from '@interface/all-eventdetails/all-eventdetails';
import {
  PaymentRequestType,
  PaystackPop,
  PaystackResponse,
} from '@interface/Payment/Payment';
import { environment } from '@environments/environment';
import { PaymentService } from '@services/payment/payment.service';
import { NotificationBellComponent } from "../../core/components/Dashboard/Attendee/notification-bell/notification-bell.component";
declare const PaystackPop: PaystackPop;


@Component({
  selector: 'app-attendee-payment-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NotificationBellComponent
],
  templateUrl: './attendee-payment-checkout.component.html',
  styleUrl: './attendee-payment-checkout.component.css'
})
export class AttendeePaymentCheckoutComponent implements OnInit, OnDestroy {
  fullName = sessionStorage.getItem('fullName');
  email = sessionStorage.getItem('email');
  lastName = '';
  firstName = '';
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  eventId: string = '';
  userId: string = '';
  phone: string = sessionStorage.getItem('phone') || '';
  totalPrice: number = 0;
  eventdetails!: ViewEventdetails;
  isVirtualEvent: boolean = false;

  constructor(
    private eventService: GetEventService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private paymentService: PaymentService,
    private location: Location
  ) { }


  ngOnInit(): void {    
    this.fullName = `${this.firstName} ${this.lastName}`;
    this.loadUserProfile()
    sessionStorage.setItem('phone', this.phone);
    this.userId = sessionStorage.getItem('userId') || '';
    this.route.paramMap?.subscribe(params => {
      this.eventId = params.get('eventId') || '';
      this.loadEventDetails(this.eventId);
    });


  }

  payWithPayStack(): void {
    const email = 'kunis15@king.buzz';
    const handler = PaystackPop.setup({
      key: `${environment.PAYSTACK_TEST_PUBLIC_KEY}`,
      email: email,
      amount: this.totalPrice * 100,
      currency: 'GHS',
      channels: ['mobile_money', 'card'],
      callback: (response: PaystackResponse) => {
        const reference = response.reference;
        this.verifyPaymentFromPayStack(reference);
      },
    });
    handler.openIframe();
  }

  loadEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (res: ViewEventdetails) => {
        this.eventdetails = res;
        if(this.eventdetails.eventType === 'VIRTUAL') {
          this.isVirtualEvent = true;
          this.totalPrice = this.eventdetails.virtualEventPrice
        }
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError('Error fetching event details');
      }
    });
  }

  goback() {
    this.location.back()
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
      this.notificationService.showError('User not found');
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

  handleSubmit() {
    sessionStorage.setItem('phone', this.phone);

    if(this.isVirtualEvent) {
      this.payWithPayStack();
    }
    else {
      this.router.navigate(['attendee-payment-ticket-type/', this.eventId]);
    }
    
  }

  private verifyPaymentFromPayStack(reference: string): void {
    const request = new PaymentRequestType(
      this.eventId,
      0,
      0,
      this.userId,
      reference,
      this.phone
    );

    this.paymentService.verifyPayment(request).subscribe({
      next: (response) => {
        if (response.ok) {
          this.notificationService.showSuccess('Payment Successful');
          sessionStorage.removeItem('phone')
          this.router.navigate(['/my-events']);
        }
      },
      error: (error) => {
        this.notificationService.showError('Error occured while making payment');
      },
    });
  }

}