import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserInviteComponent } from './user-invite/user-invite.component';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PreloadGeneralComponent } from "../../../../../shared/preload-general/preload-general.component";

@Component({
    selector: 'app-users',
    standalone: true,
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
    imports: [
        CommonModule,
        RouterLink,
        UserInviteComponent,
        PreloadGeneralComponent
    ]
})
export class UsersComponent {



  OrgDasImg: string = 'assets/esp/logo.png'
  DashBoardChartImg: string = 'assets/esp/dashboard/bar-chart-square-02.png'
  EventLayerImg: string = 'assets/esp/dashboard/layers-three-01.png'
  SettingsImg: string = 'assets/esp/dashboard/user.png'
  LogoutImg: string = 'assets/esp/dashboard/logout.png'
  NavbarBell: string = 'assets/esp/dashboard/bell.png'
  NavBarImg: string = 'assets/esp/dashboard/avatar.png'
  NavBarDownArrow: string = 'assets/esp/dashboard/down.png'
  CardImg: string = 'assets/esp/dashboard/event-created.png'

  SearchImg: string = 'assets/esp/dashboard/search.png'
  FilterImg: string = 'assets/esp/dashboard/filter.png'
  userPlus: string = 'assets/esp/dashboard/user-plus.png'

  Filters: string = 'Filters'
  Free: string = 'Free'
  Paid: string = 'Paid'
  inviteUser: string = 'Invite user'
  inviteFirst: string = 'Invite your first user'
  addUsers: string = 'Add users on this page'

  userManage: string = 'User management';
  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  subTitle: string = 'Manage Co-organizers and venue staff here.'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'


  eventCreated: boolean = false
  eventNotCreated: boolean = false

  modal = false

  constructor(private router: Router, private http: HttpClient) { }

  orgEvent() {
    this.router.navigate(['/org-event']);
  }
  orgCreateEvent() {
    this.router.navigate(['/org-create-event']);

  }
  orgDash() {
    this.router.navigate(['/org-dash']);
  }

  orgUsers() {
    this.router.navigate(['/org-users'])

  }

  logout() {

    const confirmLogOut = window.confirm('Are you sure you want to logout?');
    if (confirmLogOut) {
      sessionStorage.removeItem(environment.ORGANIZER_TOKEN);
      localStorage.clear();
      this.router.navigate(['/login']);

    }

  }


  users() {
    this.router.navigate(['/org-users'])

  }

  userInvite() {
    this.router.navigate(['/user-invite']);
  }

  openModal() {
    this.modal = true
  }

  closeModal() {
    this.modal = !this.modal
  }

  profile: boolean = false
  email = 'ekumku@example.com'

  toggleCard() {

    this.profile = !this.profile

  }

  threeButtonAction: boolean = false

  actionMenu() {

    this.threeButtonAction = !this.threeButtonAction

  }

  accountSettings() {
    this.router.navigate(['/org-settings']);

  }
  records: any[] = [];
  currentPage: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  totalPages: number = 0;
  displayUsers: boolean = false;
  hidePaginations: boolean = false;


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {

    const userId = localStorage.getItem(environment.USER_ID);

    if (!userId) {
      console.error('User Id not found');
      return;
    }

    const url = `${environment.GET_ALL_USERS_ORG}/${userId}?page=${this.currentPage}&size=${this.pageSize}`;
    this.displayUsers = true
    this.hidePaginations = true;
    this.http.get<any>(url).subscribe({

      next: (response: any) => {
        this.records = response.content;
        this.eventCreated = true;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        console.log(this.records);
        this.displayUsers = false
        this.hidePaginations = false;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  getPageNumbers(): number[] {
    return Array.from({ length: Math.ceil(this.totalElements / this.pageSize) }, (_, i) => i + 1);
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchData();
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchData();
  }

}
