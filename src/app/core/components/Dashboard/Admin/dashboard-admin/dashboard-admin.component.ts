import { CommonModule } from '@angular/common';
import {  Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AdminSidebarComponent } from '@component/admin-sidebar/admin-sidebar.component';
import { Analytics } from '@interface/Admin/admin-analytics';
import { AdminService } from '@services/Admin/admin-dashboard/admin.service';
import { StatisticsComponent } from '@components/Dashboard/Admin/statistics/statistics.component';
import { AdminProfile } from '@interface/Admin/getAllUsers';
import { ProfileService } from '@services/Admin/profile/profile.service';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { registerLicense } from '@syncfusion/ej2-base';
import { Chart, registerables } from 'chart.js';
import {dashboardConstant} from './dashboard-contant';
import { Subscription } from 'rxjs';
import { AllUsersService } from '@services/Admin/All Users/all-users.service';
import { NotificationBellComponent } from '@components/Dashboard/Attendee/notification-bell/notification-bell.component';

Chart.register(...registerables);

registerLicense(environment.REGISTRATION_lICENSE);

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AdminSidebarComponent,
    StatisticsComponent,
    CalendarModule,
    NotificationBellComponent
  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],

  
})
export class DashboardAdminComponent implements OnInit {

  fullName = dashboardConstant.fullName;
  NavBarName = dashboardConstant.NavBarName;
  subTitle = dashboardConstant.subTitle;
  Dashboard = dashboardConstant.Dashboard;
  Users = dashboardConstant.Users;
  LogOut = dashboardConstant.LogOut;
  eventCreated = dashboardConstant.eventCreated;
  Revenue = dashboardConstant.revenue;
  fourThousand = dashboardConstant.fourThousand;
  Attendees = dashboardConstant.Attendees;
  EightThousand = dashboardConstant.EightThousand;
  RevChart = dashboardConstant.RevChart;
  totalEvents = dashboardConstant.totalEvents;
  totalTickets = dashboardConstant.totalTickets;
  totalRevenue = dashboardConstant.totalRevenue;
  organizerPercentage = dashboardConstant.organizerPercentage;
  ticketSoldPercentage = dashboardConstant.ticketSoldPercentage;
  activeStep = dashboardConstant.activeStep;
  showProfileCard = dashboardConstant.showProfileCard;
  value = dashboardConstant.value;
  email = dashboardConstant.email;
  profileSubscription!: Subscription;
  profileImageUrl: string = '';
  
  adminAnalytics = inject(AdminService);
  adminProfile = inject(ProfileService);
  router = inject(Router);
  allUsersService = inject(AllUsersService)

 
  


  constant = dashboardConstant

  ngOnInit(): void {
    this.loadAnalytics();
    this.subscribeToProfile();
    this.loadUserProfile();

  }

  loadAnalytics(): void {
    this.adminAnalytics.getAnalytics().subscribe({
      next: (data: Analytics) => {
        this.totalEvents = data.totalEventsCreated;
        this.totalTickets = data.totalTicketsEverSold;
        this.totalRevenue = data.allRevenueMade;
        this.createDoughnutChart(data);
      }
    });
  }

  loadUserProfile() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.profileSubscription = this.allUsersService.profile$.subscribe(profile => {
        if (profile) {
          this.profileImageUrl = profile.profileImageUrl;
          this.fullName = profile.lastName;
          this.email = profile.email;
        }
      });
      this.allUsersService.loadUserProfile(userId);
    } 
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }


  
  

  subscribeToProfile(): void {
    this.adminProfile.profile$.subscribe((profile: AdminProfile | null) => {
      if (profile) {
        this.fullName = `${profile.firstName} ${profile.lastName}`;
        this.profileImageUrl = profile.profileImageUrl;
        localStorage.setItem('fullName', this.fullName);
      }
    });
  }

  createDoughnutChart(data: Analytics): void {
    const organizersData = Object.values(data.currentYearData.organizers).map(
      (value) => Number(value)
    );
    const attendeesData = Object.values(data.currentYearData.attendees).map(
      (value) => Number(value)
    );

    const totalOrganizers = organizersData.reduce((acc, value) => acc + value, 0);
    const totalAttendees = attendeesData.reduce((acc, value) => acc + value, 0);
    const totalUsers = totalOrganizers + totalAttendees;

    const innerTextPlugin = {
      id: 'innerTextPlugin',
      beforeDraw(chart: any) {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;

        ctx.restore();
        const fontSize = (height / 160).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';        
        const textY = height / 2;
        ctx.save();
      },
    };

    new Chart('userChart', {
      type: 'doughnut',
      data: {
        labels: ['Organizers', 'Attendees'],
        datasets: [
          {
            data: [totalOrganizers, totalAttendees],
            backgroundColor: ['rgba(230, 46, 5, 1)', 'rgba(151, 24, 12, 1)'],
            borderColor: ['rgba(230, 46, 5, 1)', 'rgba(151, 24, 12, 1)'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: false,
            text: `Active users ${totalUsers}`,
          },
        },
      },
      plugins: [innerTextPlugin],
    });
  }

  toggleCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  adminEvent() {
    this.router.navigate(['/admin-event']);
  }

  adminDash() {
    this.router.navigate(['/admin-dash']);
  }

  adminUsers() {
    this.router.navigate(['/admin-users']);
  }

  logout() {
    const confirmLogOut = window.confirm('Are you sure you want to logout?');
    if (confirmLogOut) {
      localStorage.removeItem(environment.ADMIN_TOKEN);
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }

  showContent(step: string): void {
    this.activeStep = step;
  }

  accountSettings() {
    this.router.navigate(['/admin-settings']);
  }
}
