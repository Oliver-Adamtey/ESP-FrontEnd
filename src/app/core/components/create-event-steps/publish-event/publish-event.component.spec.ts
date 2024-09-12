import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PublishEventComponent } from './publish-event.component';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEventService } from '@services/create-event/create-event.service';
import { of } from 'rxjs';
import { NotificationService } from '@notifications//notification.service';



const mockResponse = {
  success: true,
  message: 'Event created successfully',
  data: {
    eventId: 12345,
    // other fields as necessary
  }
};

const mockCreateEventService = jasmine.createSpyObj('CreateEventService', ['createEvent']);
mockCreateEventService.createEvent.and.returnValue(of(mockResponse));


describe('PublishEventComponent', () => {
  let component: PublishEventComponent;
  let fixture: ComponentFixture<PublishEventComponent>;
  let toastrService: ToastrService;
  let createEventService: CreateEventService;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(async () => {

    const createEventServiceSpy = jasmine.createSpyObj('CreateEventService', ['createEvent']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showSuccess', 'showError']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PublishEventComponent, HttpClientModule, ToastrModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
        { provide: CreateEventService, useValue: mockCreateEventService },
        { provide: CreateEventService, useValue: createEventServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
