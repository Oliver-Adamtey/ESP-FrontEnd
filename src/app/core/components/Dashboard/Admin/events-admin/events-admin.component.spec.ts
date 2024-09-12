import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { EventsAdminComponent } from '@components/Dashboard/Admin/events-admin/events-admin.component';
import { NotificationService } from '@notifications//notification.service';
import { AllUsersService } from '@services/Admin/All Users/all-users.service';
import { EventAdminService } from '@services/Admin/event-admin/event-admin.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('EventsAdminComponent', () => {
  let component: EventsAdminComponent;
  let fixture: ComponentFixture<EventsAdminComponent>;
  let notificationService:jasmine.SpyObj<NotificationService>;
  let allUsersService:jasmine.SpyObj<AllUsersService>;
  let eventsAdminService: jasmine.SpyObj<EventAdminService>

  beforeEach(async () => {
    const eventAdminServiceSpy = jasmine.createSpyObj('EventAdminService', ['getEvents', 'getEventsByTicketStatus']);
    const allUsersServiceSpy = jasmine.createSpyObj('AllUsersService', ['loadUserProfile']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationsService', ['showError']);
    allUsersServiceSpy.profile$ = of({ profileImageUrl: 'url', lastName: 'Doe', email: 'john.doe@example.com' })


    await TestBed.configureTestingModule({
      imports: [EventsAdminComponent, HttpClientModule],
      providers: [
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: AllUsersService, useValue: allUsersServiceSpy },
        { provide: EventAdminService, useValue: eventAdminServiceSpy },
        { provide: ActivatedRoute,
          useValue:{
            params: of({id:123}),
            snapshot: {
              paraMap:{
                get:(key:string) => '123'
              }
            }
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsAdminComponent);
    component = fixture.componentInstance;
    eventsAdminService = TestBed.inject(EventAdminService) as jasmine.SpyObj<EventAdminService>
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>
    allUsersService = TestBed.inject(AllUsersService) as jasmine.SpyObj<AllUsersService>
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });
});
