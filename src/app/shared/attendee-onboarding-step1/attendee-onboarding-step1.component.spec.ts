import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeOnboardingStep1Component } from './attendee-onboarding-step1.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';


describe('AttendeeOnboardingStep1Component', () => {
  let component: AttendeeOnboardingStep1Component;
  let toastrService: ToastrService;
  let fixture: ComponentFixture<AttendeeOnboardingStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeOnboardingStep1Component, HttpClientModule, ToastrModule.forRoot()],
      providers: [ToastrService]  // Add the ToastrService to the providers list
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeOnboardingStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
