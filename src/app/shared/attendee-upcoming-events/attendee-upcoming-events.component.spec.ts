import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AttendeeUpcomingEventsComponent } from './attendee-upcoming-events.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AttendeeUpcomingEventsComponent', () => {
  let component: AttendeeUpcomingEventsComponent;
  let fixture: ComponentFixture<AttendeeUpcomingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeeUpcomingEventsComponent, HttpClientModule, ToastrModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeeUpcomingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
