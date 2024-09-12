import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SettingsAdminComponent } from './settings-admin.component';
import { of, throwError } from 'rxjs';
import { AllUsersService } from '@services/Admin/All Users/all-users.service';
import { AdminProfile } from '@interface/Admin/getAllUsers';
import { NotificationService } from '@notifications//notification.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

describe('SettingsAdminComponent', () => {
  let component: SettingsAdminComponent;
  let fixture: ComponentFixture<SettingsAdminComponent>;
  let allUsersService: AllUsersService;
  let notificationsService: NotificationService;
  let toastrService: ToastrService;

  const mockProfileData: AdminProfile = {
    message: 'Profile fetched successfully',
    status: 200,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profileImageUrl: 'test.png'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAdminComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers:[
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsAdminComponent);
    component = fixture.componentInstance;
    allUsersService = TestBed.inject(AllUsersService);
    notificationsService = TestBed.inject(NotificationService);
    spyOn(sessionStorage, 'getItem').and.returnValue('12345')
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
