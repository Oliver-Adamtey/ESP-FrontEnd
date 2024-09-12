import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AttendeePopularEventsComponent } from './attendee-popular-events.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('AttendeePopularEventsComponent', () => {
  let component: AttendeePopularEventsComponent;
  let fixture: ComponentFixture<AttendeePopularEventsComponent>;
  let toastreService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendeePopularEventsComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { params: { attendeeId: '123' } } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendeePopularEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
