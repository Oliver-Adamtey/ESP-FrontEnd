import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrganizerDashGraphComponent } from '../../../../../../shared/organizer-graph/organizer-dash-graph/organizer-dash-graph.component';
import { environment } from '../../../../../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [

    CommonModule,
    RouterLink,
    OrganizerDashGraphComponent



  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'

})
export class DashboardComponent {

OrganizerDashGraphComponent = OrganizerDashGraphComponent


OrgDasImg: string = 'assets/esp/logo.png'
DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
SettingsImg: string = 'assets/esp/dashboard/user.png'
LogoutImg: string = 'assets/esp/dashboard/logout.png'
NavbarBell: string = 'assets/esp/dashboard/bell.png'
NavBarImg: string = 'assets/esp/dashboard/avatar.png'
NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
CardImg: string = 'assets/esp/dashboard/three-dots.png'
baseImg: string = 'assets/esp/dashboard/base.png'
pieChart: string = 'assets/esp/dashboard/pie_chart.png'

  Event: string = 'Event';
  Vista: string = 'Vista';

  NavBarName: string = 'Olivia Rhye'
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




constructor(private router: Router) {};

orgEvent(){
  this.router.navigate(['/org-event']);
}
orgDash(){
this.router.navigate(['/org-dash']);
}

orgUsers(){
this.router.navigate(['/org-users'])

}

logout(){

const confirmLogOut = window.confirm('Are you sure you want to logout?');

if(confirmLogOut){
  if(!localStorage==undefined){
  localStorage.removeItem(environment.ORGANIZER_TOKEN);
  localStorage.clear();
  this.router.navigate(['/login']);

}}

}

activeStep: string = 'monthly';


  showContent(step: string): void {
    this.activeStep = step;
  }


  accountSettings() {
    this.router.navigate(['/org-settings']);

  }

  profile: boolean = false;
  email= 'ekumkofi@example.com';

  toggleCard() {

    this.profile = !this.profile
    // this.router.navigate(['/login']);

  }

     fullName = localStorage.getItem('fullName')


}




