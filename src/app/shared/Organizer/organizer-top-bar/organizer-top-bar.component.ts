import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@notifications//notification.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProfileDataService } from '../../../core/services/Organizer/Profile_Data/profile-data.service';
import { ProfileData, ProfileResponse } from '../../../core/Interface/create-event/organizer';
import { NotificationsAlertService } from '../../../core/services/Organizer/NotificationsAlert/notifications-alert.service';
import { NotificationData, NotificationResponse } from '../../../core/Interface/Organizer/notification';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-organizer-top-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizer-top-bar.component.html',
  styleUrl: './organizer-top-bar.component.css'
})
export class OrganizerTopBarComponent {

  @Input() heading: string = '';
  @Input() sub_Heading: string = '';

  constructor(private router: Router,
    private ProfileDataService: ProfileDataService,
    private notificationService: NotificationService,
    private notoficationAlert: NotificationsAlertService,
    private renderer: Renderer2
  ) { }

  @Output() profileImageEmit = new EventEmitter<string>();

  @ViewChild('bellCard') bellCard!: ElementRef;
  @ViewChild('bellCardProfile') bellCardProfile!: ElementRef;

  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = ''
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
  CardImg: string = 'assets/esp/dashboard/three-dots.png'
  baseImg: string = 'assets/esp/dashboard/base.png'
  pieChart: string = 'assets/esp/dashboard/pie_chart.png'

  Event: string = 'Event';
  Vista: string = 'Vista';

  navBarName: string = sessionStorage.getItem("organizerName") || ''
  subTitle: string = 'Plan and manage your gatherings effortlessly.'
  Dashboard: string = 'Dashboard'
  Users: string = 'Users'
  LogOut: string = 'Log out'

  eventCreated: string = 'Events created'
  Revenue: string = 'Revenue'
  fourThousand: number = 4000
  Attendees: string = 'Number of Attendees'
  EightThousand: number = 8000
  RevChart: string = 'Revenue chart'
  profile: boolean = false;
  bell: boolean = false;
  email = sessionStorage.getItem('email');
  toggle: boolean = false
  toggleBell: boolean = false
  readId!: number
  UnreadNotificationData: any[] = [];
  unreadNotificationCount: number = 0;
  private refreshSubscription!: Subscription;

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
    this.getUnReadNotification();
    this.getProfileData();

    this.refreshSubscription = interval(2000).subscribe(() => {
      this.getUnReadNotification();
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  getUnReadNotification() {
    this.notoficationAlert.getUnReadNotification().subscribe({
      next: (response: NotificationResponse) => {
        this.UnreadNotificationData = response.content;
        this.unreadNotificationCount = this.UnreadNotificationData.length;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      }
    });
  }


  subscribeNotification() {
    this.notoficationAlert.Notificationsubscribe().subscribe({
      next: (data: any) => {
        if (typeof data.message === 'string') {
        } else {
        }
      },
      error: (error) => {
        this.notificationService.showError('Error receiving notifications');
      },

    })
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



  getUnreadNotificationCount(): string {
    const count = this.UnreadNotificationData.length;
    return count > 10 ? '10+' : count.toString();
  }



  ReadNotification(notificationId: number) {
    this.notoficationAlert.ReadNotification(notificationId).subscribe({
      next: (response) => {

        this.isLogoutModalVisible = true
        this.readId = notificationId
         this.refreshSubscription = interval(2000).subscribe(() => {
          this.isLogoutModalVisible = false
    });

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

  }



}
