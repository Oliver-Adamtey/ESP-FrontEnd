import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeOnboardingStep3Component } from './attendee-onboarding-step3.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('AttendeeOnboardingStep3Component', () => {
  let component: AttendeeOnboardingStep3Component;
  let fixture: ComponentFixture<AttendeeOnboardingStep3Component>;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeOnboardingStep3Component, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastrService]  // Add ToastrService to the providers array in TestBed.configureTestingModule()
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeOnboardingStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
