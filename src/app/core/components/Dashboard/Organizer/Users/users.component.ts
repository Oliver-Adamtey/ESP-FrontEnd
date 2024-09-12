import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PreloadGeneralComponent } from "@component/preload-general/preload-general.component";
import { OrganizerDashComponent } from "@component/Organizer/organizer-sidebar/organizer-dash.component";
import { OrganizerTopBarComponent } from "@component/Organizer/organizer-top-bar/organizer-top-bar.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Co_Organizer } from '@interface/Organizer-filtering/records';
import { ActivateCoOrgService } from '@services/Organizer/Activate_Co-Org/activate-co-org.service';
import { NotificationService } from '@notifications//notification.service';
import { PageDataResponse, PageResponse } from '@interface/registration/login-register';
import { GetUsersService } from '@services/Organizer/get-users/get-users.service';
import { PageableResponse } from '@interface/create-event/organizer';
import { InviteUserService } from '@services/Organizer/invite-organizer/invite-user.service';
import { CoOrganizerPermsService } from '@services/Organizer/Co-Organizer-Perms/co-organizer-perms.service';
import { PermissionDateResponse, PermissionInterface } from '@services/Organizer/Co-Organizer-Perms/PermissionResponse';
import { SignupFormValidators } from 'app/core/utils/validators';


interface ModalAction {

  userId: string;
  action: string;

}


@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [
    CommonModule,
    RouterLink,
    PreloadGeneralComponent,
    OrganizerDashComponent,
    OrganizerTopBarComponent,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersComponent implements OnInit {

  heading = "User management"
  sub_heading = "Manage Co-organizers and venue staff here."

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

  inviteUser: string = 'Invite user'
  inviteFirst: string = 'Invite your first user'
  addUsers: string = 'Add users on this page'

  Vista: string = 'Vista';
  AllEvent: string = 'All events'

  NavBarName: string = 'Olivia Rhye'
  Dashboard: string = 'Dashboard'
  Settings: string = 'Settings'
  LogOut: string = 'Log out'

  coOrganizerData: boolean = false
  eventNotCreated: boolean = false

  modal = false
  storedId: number | null = null;

  currentPage: number = 0;
  totalPages: number = 0;
  displayUsers: boolean = false;
  hidePaginations: boolean = false;
  failed: boolean = false;
  noResultsFound: boolean = false;

  isActionMenuOpen: boolean = false;
  selectedItemId: string | null = null;
  isChangeState: boolean = false;
  changeChaState: boolean = false;
  state = '';
  co_OrgId = '';

  decodedToken: any;
  preload: boolean = false;
  createEvent_: boolean = false;
  records: Array<Co_Organizer> = [];
  filteredSupplier: Array<Co_Organizer> = [];
  displayedSuppliers: Array<Co_Organizer> = [];
  currenPage: number = 0;
  pageSize: number = 5;
  filterByCategory: string = '';
  isModalVisible = false;
  activeSection: string = 'users';
  usersOption: boolean = false;
  isToggled: boolean = false;
  inviteModal: boolean = false

  OrganInvite: FormGroup

  @ViewChildren('Card') cards!: QueryList<ElementRef>;

  constructor(private router: Router,
    private http: HttpClient,
    private activate: ActivateCoOrgService,
    private notificationService: NotificationService,
    private getCoOrg: GetUsersService,
    private inviteUserServ: InviteUserService,
    private setPermissions: CoOrganizerPermsService,
    private organizer: InviteUserService,
    private renderer: Renderer2

  ) {


    this.OrganInvite = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      fullName: new FormControl('', SignupFormValidators.fullName),
      role: new FormControl("CO_oRGANIZER", [Validators.required, Validators.minLength(8)])

    });
  }

  closeActions() {
    this.isActionMenuOpen = false

  }


  toggleActionMenu(itemId: string) {

    if (this.selectedItemId === itemId) {
      this.isActionMenuOpen = !this.isActionMenuOpen;
    } else {
      this.isActionMenuOpen = true;
    }
    this.selectedItemId = itemId;

    if (this.isActionMenuOpen) {
      this.renderer.listen('document', 'click', (event: Event) => this.onClickOutsideActions(event));
    } else {
      this.renderer.destroy();
    }
  }


  onClickOutsideActions(event: Event) {
    if (this.cards && this.cards.length) {
      const isOutside = this.cards.toArray().every((card) =>
        !card.nativeElement.contains(event.target as Node)
      );

      if (isOutside) {
        this.isActionMenuOpen = false;
      }
    }}


  onSubmit() {
    if (this.OrganInvite.valid) {
      const postData = this.OrganInvite.value;
      this.organizer.organizer(postData).subscribe({
        next: (response) => {
          this.notificationService.showSuccess('Invitation sent successfully');
          this.inviteModal = false
          this.getAllCoOrganizer(this.currenPage)

          setTimeout(() => {
            this.router.navigateByUrl('/org-users');
          }, 1000);
        },

        error: (error) => {
          const signupError: PageResponse = error.error;
          this.notificationService.showError(signupError.message);
        },
      });
    }
  }



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

  users() {
    this.router.navigate(['/org-users'])

  }

  userInvite() {
    this.router.navigate(['/user-invite']);
  }

  closeModal() {
    this.inviteModal = false

  }
  openModal() {
    this.inviteModal = true

  }

  ngOnDestroy() {
    this.openModal();
  }

  profile: boolean = false

  toggleCard() {

    this.profile = !this.profile

  }

  threeButtonAction: boolean = false

  accountSettings() {
    this.router.navigate(['/org-settings']);

  }

  ngOnInit() {
    this.currenPage = 0
    this.getAllCoOrganizer(this.currenPage)
    this.permissionStartAction();
    this.getUserRole()

  }

  pageDataResponse?: PageDataResponse

  getAllCoOrganizer(currentPage: number) {
    this.getCoOrg.getCoOrganizers(currentPage, this.pageSize).subscribe({
      next: (response: PageDataResponse) => {
        this.pageDataResponse = response;
        this.records = response.data.content;

      },
      error: (error: HttpErrorResponse) => {
        this.preload = true;
        this.createEvent_ = true;
        this.notificationService.showError(error.error.message);
      },
    });
  }

  nextPage() {
    if (this.currenPage < this.totalPagesArray.length - 1) {
      this.currenPage++;
      this.getAllCoOrganizer(this.currenPage);
    }
  }

  previousPage() {
    if (this.currenPage > 0) {
      this.currenPage--;

      this.getAllCoOrganizer(this.currenPage);

    }

  }


  get totalElements(): number {
    return this.pageDataResponse?.data?.totalElements ?? 0;
  }


  get totalPagesArray(): number[] {
    return Array.from({ length: this.pageDataResponse?.data?.totalPages || 0 }, (_, i) => i);

  }

  changePage(pageNumber: number) {
    this.getAllCoOrganizer(pageNumber);

  }

  filterData(status?: string, search?: string) {
    this.inviteUserServ.getUsersByStatusAndSearch(status, search).subscribe({
      next: (response: PageDataResponse) => {
        this.records = response.data.content;
      },
      error: (err) => {
      }
    });
  }

  cancelState() {
    this.isModalVisible = false;
  }

  modalAction = []

  userId: string = ''
  action: string = ''
  permissionBool!: boolean

  showModal(userId: string, action: string) {
    if (action === 'activate' || action === 'deactivate' || action === 'delete' || action === 'createperm') {
      this.isModalVisible = true;
      this.userId = userId;
      this.action = action;
    }

  }

  confirmState() {
    if (this.action === 'activate') {

      this.activateAccount();
    } else if (this.action === 'deactivate') {
      this.deactivateAccount();


    } else if (this.action === 'delete') {
      this.deleteAccount();
    }
    this.isModalVisible = false;
    this.toggleActionMenu(this.userId);

  }


  permissionStatus!: PermissionInterface[]

  permissionStartAction() {
    this.setPermissions.permission().subscribe({
      next: (response: PermissionDateResponse) => {
        this.permissionStatus = response.content
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },

    });
  }


  onCreate(coOrgId: string, action: boolean) {
    this.userId = coOrgId;
    const updatedAction = !action;
    this.setPermissions.create(coOrgId, updatedAction).subscribe({
      next: (response: PermissionDateResponse) => {
        this.notificationService.showSuccess('create event permission set successfully');

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }


  onUpdate(coOrgId: string, action: boolean) {
    this.userId = coOrgId;
    const updatedAction = !action;

    this.setPermissions.update(coOrgId, updatedAction).subscribe({
      next: (response: PermissionDateResponse) => {
        this.notificationService.showSuccess('update permission set successfully');

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  onDelete(coOrgId: string, action: boolean) {
    this.userId = coOrgId;
    const updatedAction = !action;
    this.setPermissions.delete(coOrgId, updatedAction).subscribe({
      next: (response: PermissionDateResponse) => {
        this.notificationService.showSuccess('delete permission set successfully');

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  onInvite(coOrgId: string, action: boolean) {
    this.userId = coOrgId;
    const updatedAction = !action;
    this.setPermissions.invite(coOrgId, updatedAction).subscribe({
      next: (response: PermissionDateResponse) => {
        this.notificationService.showSuccess('invite permission set successfully');

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  activateAccount() {
    this.activate.activateAccount(this.userId).subscribe({
      next: (response: PageResponse) => {
        this.notificationService.showSuccess(response.message);

        this.records = this.records.map(user => {
          if (user.id === this.userId) {
            user.enabled = true;
          }
          return user;
        });
        this.filteredSupplier = this.records;

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });

  }


  deactivateAccount() {
    this.activate.dectivateAccount(this.userId).subscribe({
      next: (response: PageResponse) => {
        this.notificationService.showSuccess(response.message);
        this.records = this.records.map(user => {
          if (user.id === this.userId) {
            user.enabled = false;
          }
          return user;
        });

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }

  deleteAccount() {
    this.activate.deleteAccount(this.userId).subscribe({
      next: (response: PageResponse) => {
        this.getAllCoOrganizer(this.currenPage)
        this.notificationService.showSuccess(response.message);
        this.records = this.records.filter(user => user.id !== this.userId);

      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message);
      },
    });
  }


  viewEvent(eventId: string, fullName: string) {
    this.router.navigate([`/coorg-user-permision/${eventId}`]);
    sessionStorage.setItem('co-organizerName', fullName.toString());
    sessionStorage.setItem('co-organizerId', eventId);


  }

  toggleSection(section: string) {
    this.activeSection = section;
    this.permissionStartAction()

  }

co_OrganizerRole: boolean = false;
OrganizerRole: boolean = false

  getUserRole(){
    const userData = JSON.parse(localStorage.getItem('userData')!);
    const userRole = userData ? userData.userRole : null;
    if(userRole ==='CO_ORGANIZER'){
      this.co_OrganizerRole = true;
    }else{
      this.OrganizerRole = true;
    }
  }




}
