import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeSettingsComponent } from './attendee-settings.component';
import { NotificationService } from '@notifications//notification.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('AttendeeSettingsComponent', () => {
  let component: AttendeeSettingsComponent;
  let fixture: ComponentFixture<AttendeeSettingsComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeSettingsComponent, HttpClientModule],
      providers: [
        NotificationService,
        { provide: ToastrService, useValue: { success: () => {}, error: () => {} } },
        { provide: ActivatedRoute, useValue: { snapshot: { data: { attendee: {} } } } },  
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
