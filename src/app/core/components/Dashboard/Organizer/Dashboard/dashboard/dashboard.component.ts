import { CommonModule } from '@angular/common';
import {  Component, OnInit, inject,  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrganizerDashGraphComponent } from '@component/organizer-graph/organizer-dash-graph/organizer-dash-graph.component';
import { OrganizerDashComponent } from "@component/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "@component/Organizer/organizer-top-bar/organizer-top-bar.component";
import { OrganizerDashMetricComponent } from "@component/Organizer/organizer-dash-metric/organizer-dash-metric.component";
import { OrganizerChartComponent } from "@component/Organizer/organizer-chart/organizer-chart.component";
import { OrganizerRevenueChartComponent } from "@component/Organizer/organizer-revenue-chart/organizer-revenue-chart.component";
import { OrgProgressComponent } from '../org-progress/org-progress.component';

import { OrganizerDashboardService } from '@services/Organizer/dashboard/organizer-dashboard.service';
import { Data, Organizer } from '@interface/Admin/Organizer-dashboard/Organizer-dashboard';
import { Analytics } from '@interface/Admin/admin-analytics';

import {OrganizerGraphComponent} from '../organizer-graph/organizer-graph.component'
import { OrganizerStatasticsComponent } from '../organizer-statistics/organizer-statastics.component';
import { OrganizerEventComponent } from '../organizer-recent/organizer-event.component';
import {organizerConstant} from './organizer-constant'



import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { BehaviorSubject } from 'rxjs';




@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [
    CommonModule,
    RouterLink,
    OrganizerDashGraphComponent,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    OrganizerDashMetricComponent,
    OrganizerChartComponent,
    OrganizerRevenueChartComponent,
    OrganizerGraphComponent,
    OrganizerStatasticsComponent,
    CalendarModule,
    OrganizerEventComponent,
    OrgProgressComponent
  ],
})
export class DashboardComponent implements OnInit {

OrganizerDashGraphComponent = OrganizerDashGraphComponent

heading = organizerConstant.contents.heading;
  sub_heading = organizerConstant.contents.subHeading;

  OrgDasImg: string = organizerConstant.images.orgDasImg;
  DashBoardChartImg: string = organizerConstant.images.dashBoardChartImg;
  EventLayerImg: string = organizerConstant.images.eventLayerImg;
  SettingsImg: string = organizerConstant.images.settingsImg;
  LogoutImg: string = organizerConstant.images.logoutImg;
  NavbarBell: string = organizerConstant.images.navbarBell;
  NavBarImg: string = organizerConstant.images.navBarImg;
  NavBarDownArrow: string = organizerConstant.images.navBarDownArrow;
  CardImg: string = organizerConstant.images.cardImg;
  baseImg: string = organizerConstant.images.baseImg;
  pieChart: string = organizerConstant.images.pieChart;

  Event: string = organizerConstant.contents.event;
  Vista: string = organizerConstant.contents.vista;

  NavBarName: string = organizerConstant.contents.navBarName;
  Users: string = organizerConstant.contents.users;
  LogOut: string = organizerConstant.contents.logOut;

  eventCreated: string = organizerConstant.contents.eventCreated;
  Revenue: string = organizerConstant.contents.revenue;
  fourThousand: number = 4000;
  Attendees: string = organizerConstant.contents.attendees;
  EightThousand: number = 8000;
  RevChart: string = organizerConstant.contents.revChart;

  organizerData!: Data;
  analyticsData!:Analytics;

  OrganizerData = new BehaviorSubject<Data | null>(null);
  dailyTickets = 0;
  public value: Date = organizerConstant.dates.value;
  constant = organizerConstant




private organizerDashboard = inject(OrganizerDashboardService);
private router = inject(Router);


activeStep: string = 'monthly';



  accountSettings() {
    this.router.navigate(['/org-settings']);

  }

  profile: boolean = false;
  email= 'ekumkofi@example.com';

  toggleCard() {

    this.profile = !this.profile
    

  }



     fullName = sessionStorage.getItem('organizerName');
     userId = sessionStorage.getItem('userId') || '';

     ngOnInit(): void {
       this.fetchOrganizerData();
      this.fetchAnalytics();
     }

   
     fetchOrganizerData(): void {
      this.organizerDashboard.getOrganizerData(+this.userId).subscribe({
        next: (response: Organizer) => {
          this.OrganizerData.next(response.data);
        },
      });
    }



    fetchAnalytics():void {
      this.organizerDashboard.getAnalyticsData(+this.userId).subscribe({
        next: (response:Analytics) => {
          this.analyticsData = response;
        }
      })
    }

    

    showContent(step:string):void {
      this.activeStep = step;
    }

}




