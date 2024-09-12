import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { EventImageAndTicketComponent } from './event-image-and-ticket.component';

describe('EventImageAndTicketComponent', () => {
  let component: EventImageAndTicketComponent;
  let fixture: ComponentFixture<EventImageAndTicketComponent>;
  let toastrService:ToastrService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventImageAndTicketComponent, ToastrModule.forRoot()]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventImageAndTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
