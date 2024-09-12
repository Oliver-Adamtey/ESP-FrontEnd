import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeePaymentCheckoutComponent } from './attendee-payment-checkout.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('AttendeePaymentCheckoutComponent', () => {

  const MocktoastConfig = {}

  let component: AttendeePaymentCheckoutComponent;
  let fixture: ComponentFixture<AttendeePaymentCheckoutComponent>;
  let toastreService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePaymentCheckoutComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
        {provide:ToastrService, useClass:ToastrService},
        {provide: new InjectionToken('ToastConfig'), useValue:MocktoastConfig}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePaymentCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
