import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  PaymentRequestType,
  PaystackPop,
  PaystackResponse,
} from '@interface/Payment/Payment';
import { environment } from '@environments/environment';
import { PaymentService } from '@services/payment/payment.service';
import { NotificationService } from '@notifications//notification.service';
import { TicketTier } from '@interface/Payment/TicketTier';
import { FormsModule } from '@angular/forms';
import { GetEventService } from '../../core/services/Attendee Service/get-event.service';
import { TicketTierWithDiscountsObject } from '../../core/Interface/create-event/organizer';
import { NotificationBellComponent } from "../../core/components/Dashboard/Attendee/notification-bell/notification-bell.component";

declare const PaystackPop: PaystackPop;

@Component({
  selector: 'app-attendee-payment-checkout-ticket-type',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NotificationBellComponent],
  templateUrl: './attendee-payment-checkout-ticket-type.component.html',
  styleUrl: './attendee-payment-checkout-ticket-type.component.css',
})
export class AttendeePaymentCheckoutTicketTypeComponent implements OnInit, OnDestroy {
  fullName = sessionStorage.getItem('fullName') || '';
  email = sessionStorage.getItem('email') || '';
  userId = sessionStorage.getItem('userId') || '';
  phoneNumber = sessionStorage.getItem('phone') || '';
  eventId: string = '';
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  showProfileCard: boolean = false;
  reference = '';
  ticketTiers!: TicketTier[];
  selectedTicket!: TicketTier;
  showAdditionalInfo: boolean = false;
  quantity: number = 1;
  totalPrice: number = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private eventService: GetEventService,
    private router: Router,
    private paymentService: PaymentService,
    private notificationService: NotificationService,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.loadUserProfile()
    this.activateRoute.paramMap?.subscribe((params) => {
      this.eventId = params.get('eventId') || '';
    });
    this.getTicketTier();

    
  }

  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  accountSettings() {
    this.router.navigate(['/attendee-settings']);
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

  private verifyPaymentFromPayStack(reference: string): void {
    const request = new PaymentRequestType(
      this.eventId,
      this.selectedTicket.ticketTierId,
      this.quantity,
      this.userId,
      reference,
      this.phoneNumber
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

  private getTicketTier(): void {
    this.paymentService.getTicketTier(this.eventId, this.userId).subscribe({
      next: (response: TicketTier[]) => {
        this.ticketTiers = response;
      },
      error: (error) => {
        const errorMessage = error.error?.message || error.message || 'An unknown error occurred. Please try again later.';
        this.notificationService.showError(errorMessage);
      },
    });
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileSubscription = this.eventService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName = profile.lastName;
          this.email = profile.email;
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

  increaseQuantity(ticketTier: TicketTier) {
    if (this.quantity < ticketTier.ticketQuantity) {
      this.quantity++;
      this.totalPrice = this.updateTotaPrice(ticketTier);
    }
  }

  decreaseQuantity(ticketTier: TicketTier) {
    if (this.quantity > 1) {
      this.quantity--;
      this.totalPrice = this.updateTotaPrice(ticketTier);
    }
  }

  onQuantityChange(event: Event, ticketTier: TicketTier) {
    const target = event.target as HTMLInputElement;
    const value = Math.min(Math.max(0, +target.value), ticketTier.ticketQuantity);
    this.quantity = value;
    target.value = value.toString();
    this.totalPrice = this.updateTotaPrice(ticketTier);
  }


  updateTotaPrice(ticketTier: TicketTier): number {
    let price;
  if (ticketTier.discountValue == 0 && ticketTier.conditionValue > 0 && this.quantity >= ticketTier.ticketQuantityDiscountCondition) {
    price = ticketTier.price * this.quantity * (1 - ticketTier.conditionValue);
  } else {
    price = ticketTier.price * this.quantity * (1 - ticketTier.discountValue);
  }
  return price;
  }

  getInitialValue(ticketTier: TicketTier): void {
    if (ticketTier.discountValue > 0) {
      this.totalPrice = ticketTier.price * (1 - ticketTier.discountValue);
    } else {
      this.totalPrice = ticketTier.price;
    }
    this.quantity = 1;
  }

  onTicketSelected(ticketTier: TicketTier) {
    this.getInitialValue(ticketTier);
  }

  toggleAdditionalInfo() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }

  goback() {
    this.location.back();
  }
  
}
