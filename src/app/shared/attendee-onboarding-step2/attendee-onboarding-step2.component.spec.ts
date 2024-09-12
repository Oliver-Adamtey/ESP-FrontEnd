import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeOnboardingStep2Component } from './attendee-onboarding-step2.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('AttendeeOnboardingStep2Component', () => {
  let component: AttendeeOnboardingStep2Component;
  let fixture: ComponentFixture<AttendeeOnboardingStep2Component>;
  let toastrService: ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeOnboardingStep2Component, HttpClientModule,ToastrModule.forRoot()],
      providers:[ToastrService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeOnboardingStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
