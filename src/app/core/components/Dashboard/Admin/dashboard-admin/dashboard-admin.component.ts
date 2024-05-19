import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,

  ],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

  // OrganizerDashGraphComponent = OrganizerDashGraphComponent


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

adminEvent(){
  this.router.navigate(['/admin-event']);
}
adminDash(){
this.router.navigate(['/admin-dash']);
}

adminUsers(){
this.router.navigate(['/admin-users'])

}

logout(){

  const confirmLogOut = window.confirm('Are you sure you want to logout?');

  if(confirmLogOut){

  if(!localStorage==undefined){
    localStorage.removeItem(environment.ADMIN_TOKEN);
    localStorage.clear()
    this.router.navigate(['/login']);

  }

  }

}

activeStep: string = 'monthly';


  showContent(step: string): void {
    this.activeStep = step;
  }


  accountSettings() {
    this.router.navigate(['/admin-settings']);

  }

  profile: boolean = false;
  email= 'ekumkofi@example.com';

  toggleCard() {

    this.profile = !this.profile
    // this.router.navigate(['/login']);

  }


}
