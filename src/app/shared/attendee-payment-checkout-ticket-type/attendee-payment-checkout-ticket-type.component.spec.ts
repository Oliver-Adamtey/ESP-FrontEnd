import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AttendeePaymentCheckoutTicketTypeComponent } from './attendee-payment-checkout-ticket-type.component';

describe('AttendeePaymentCheckoutTicketTypeComponent', () => {
  let component: AttendeePaymentCheckoutTicketTypeComponent;
  let fixture: ComponentFixture<AttendeePaymentCheckoutTicketTypeComponent>;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePaymentCheckoutTicketTypeComponent, HttpClientModule],
      providers: [
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['error']) },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { ticketType: 'VIP' } } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePaymentCheckoutTicketTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
