import { Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileData, ProfileResponse } from '@interface/create-event/organizer';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../notification-service/notification.service';
import { ProfileDataService } from '../../../core/services/Organizer/Profile_Data/profile-data.service';
import { NotificationsAlertService } from '../../../core/services/Organizer/NotificationsAlert/notifications-alert.service';
import { NotificationData, NotificationResponse, SseData } from '../../../core/Interface/Organizer/notification';
import { Observable, timeout } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizer-create-event-bar',

  standalone: true,
    templateUrl: './organizer-create-event-bar.component.html',
  styleUrl: './organizer-create-event-bar.component.css',

  imports: [
    CommonModule,
  ],

})
export class OrganizerCreateEventBarComponent {


  constructor(private router: Router,
    private ProfileDataService: ProfileDataService,
    private notificationService: NotificationService,
    private notoficationAlert: NotificationsAlertService,
    private renderer: Renderer2

  ) { }

  @ViewChild('bellCard') bellCard!: ElementRef;
  @ViewChild('bellCardProfile') bellCardProfile!: ElementRef;

  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'

  Event: string = 'Event'
  Vista: string = 'Vista'

  BackToEvent: string = 'Back to Event'
  Basic: string = 'Basic information'
  LocVenueLayout: string = 'Location & Venue layout'
  DateTime: string = 'Date & time'
  EventTicket: string = 'Event image & ticket'


  EventProgressImg: string = 'assets/esp/dashboard/event-create-back.png'
  closeTag: string = 'assets/esp/dashboard/Icon.png'
  EventLink: string = 'assets/esp/dashboard/basic-img.png'
  LocationImg: string = 'assets/esp/dashboard/location-img.png';
  DateAndTime: string = 'assets/esp/dashboard/date-img.png'
  Ticket: string = 'assets/esp/dashboard/ticket-img.png'


  venueLayoutUrl: string | null = null;
  seatingTypeUrl: string | null = null;
  eventImageUrl: string | null = null;
  organizerLogo: string | null = null;

  tagInput: string[] = [];
  tags: string[] = [];

  fields: boolean = false;

  showStart: boolean = false;
  showEnd: boolean = false;


  dsiplayStartTime: string = '';
  dsiplayEndTime: string = '';

  eventCreated = false;

  scheduleForm: boolean = false;
  publishNow: boolean = false;

  paidFormVisible: boolean = false;
  profile: boolean = false;
  email = sessionStorage.getItem('email');
  toggle: boolean = false
  navBarName: string = sessionStorage.getItem("organizerName") || ''
  profileImageUrl = '';
  bell: boolean = false;
  toggleBell: boolean = false


  @Output() profileImageEmit = new EventEmitter<string>();


  orgDash() {
    this.router.navigate(['/org-dash']);
  }



  accountSettings() {
    this.router.navigate(['/org-settings']);

  }


  records!: ProfileData
  fullName = sessionStorage.getItem('organizerName')

  getProfileData() {
    this.ProfileDataService.getProfileData().subscribe({
      next: (response: ProfileResponse) => {

        this.records = response.data;
        if (this.records.profileImageUrl != '') {

          this.NavBarImg = this.records.profileImageUrl;

        } else {
          this.NavBarImg = 'assets/esp/dashboard/avatar.png'

        }
        this.profileImageEmit.emit(this.NavBarImg)

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });


  }

  ngOnInit() {
    this.getProfileData();
    this.subscribeNotification();
    this.getUnReadNotification();

  }

  toggleCard() {

    this.profile = !this.profile
    this.toggle = !this.toggle
    this.bell = false

    if (this.toggle) {
      this.renderer.listen('document', 'click', (event: Event) => this.onClickOutsideProfile(event));
    } else {
      this.renderer.destroy();
    }
  }


  toggleBellCard() {
    this.bell = !this.bell;
    this.toggleBell = !this.toggleBell;
    this.profile = false;

    if (this.toggleBell) {
      this.renderer.listen('document', 'click', (event: Event) => this.onClickOutside(event));
    } else {
      this.renderer.destroy();
    }
  }

  onClickOutside(event: Event) {
    if (this.bellCard && !this.bellCard.nativeElement.contains(event.target as Node)) {
      this.bell = false;
      this.toggleBell = false;
    }
  }
  onClickOutsideProfile(event: Event) {
    if (this.bellCardProfile && !this.bellCardProfile.nativeElement.contains(event.target as Node)) {
      this.profile = false;
      this.toggle = false;
    }
  }

  subscribeNotification() {
    this.notoficationAlert.Notificationsubscribe().subscribe({
      next: (data: any) => {
        if (typeof data.message === 'string') {
        } else {
        }
      },
      error: (error) => {
        console.error('Error receiving notifications: ', error);
      },
      complete: () => {
      }
    })
  }


  getUnreadNotificationCount(): string {
    const count = this.UnreadNotificationData.length;
    return count > 10 ? '10+' : count.toString();
  }


  UnreadNotificationData!: NotificationData[]
  getUnReadNotification() {
    this.notoficationAlert.getUnReadNotification().subscribe({
      next: (response: NotificationResponse) => {
        this.UnreadNotificationData = response.content

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);

      }
    });

  }

  markAllRead() {
    this.notoficationAlert.readAllNotification().subscribe({
      next: (response) => {
        this.getUnReadNotification();
        this.getUnreadNotificationCount()

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });

  }

  readId!: number

  ReadNotification(notificationId: number) {
    this.notoficationAlert.ReadNotification(notificationId).subscribe({
      next: (response) => {

        this.isLogoutModalVisible = true
        this.readId = notificationId

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });

  }




  isLogoutModalVisible = false;


  cancelLogout() {
    this.getUnReadNotification();
    this.getUnreadNotificationCount()
    this.isLogoutModalVisible = false;
  }

  viewAllNotification() {
    this.router.navigateByUrl('/org-view-all-notification');
    this.toggleBell = !this.toggleBell

  }


}



