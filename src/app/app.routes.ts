import { UsersAdminComponent } from './core/components/Dashboard/Admin/users-admin/users-admin.component';
import { Routes } from '@angular/router';
import { RegistrationComponent } from './core/components/registration/registration.component';
import { LoginComponent } from './core/components/login/login.component';
import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/components/reset-password/reset-password.component';
import { HomeComponent } from './core/components/home/home.component';
import { DashboardComponent } from './core/components/Dashboard/Organizer/Dashboard/dashboard/dashboard.component';
import { EventComponent } from './core/components/Dashboard/Organizer/Event/event/event.component';
import { CreateEventComponent } from './core/components/create-event/create-event.component';
import { TokenComponent } from './core/components/token/token.component';
import { authGuard } from './core/guards/organizer/auth-guard.guard';
import { adminGuard } from './core/guards/admin/admin.guard';
import { UsersComponent } from './core/components/Dashboard/Organizer/Users/users.component';
import { UserInviteComponent } from './core/components/Dashboard/Organizer/Users/user-invite/user-invite.component';
import { SettingsComponent } from './core/components/Dashboard/Organizer/settings/settings.component';
import { DashboardAdminComponent } from './core/components/Dashboard/Admin/dashboard-admin/dashboard-admin.component';
import { EventsAdminComponent } from './core/components/Dashboard/Admin/events-admin/events-admin.component';
import { SettingsAdminComponent } from './core/components/Dashboard/Admin/settings-admin/settings-admin.component';
import { CreateEventAdminComponent } from './core/components/Dashboard/Admin/create-event-admin/create-event-admin.component';
import { CreateEventSuccessComponent } from './shared/create-event-success/create-event-success.component';
import { UserPaginationComponent } from './shared/Organizer/pagination/user-pagination.component';
import { AttendeeEventComponent } from './core/components/Dashboard/Attendee/attendee-home/attendee-event.component';
// import { DashboardComponent } from './core/components/DASHBOARD_/dashboard/dashboard.component';
// import { EventsComponent } from './core/components/DASHBOARD_/events/events.component';



export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,

  },
  {
    path: 'pagination',
    component: UserPaginationComponent,

  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent
  },
  {
    path: 'attendee',
    component: AttendeeEventComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'org-dash',
    component: DashboardComponent,
    canActivate: [authGuard],

  },
  {
    path: 'org-event',
    component: EventComponent,
    canActivate: [authGuard],
  },
  {
    path: 'org-create-event',
    component: CreateEventComponent,
    canActivate: [authGuard],
  },
  {
    path: 'org-users',
    component: UsersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'org-settings',
    component: SettingsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'create-event-success',
    component: CreateEventSuccessComponent,
    canActivate: [authGuard],
  },


  {
    path: 'admin-dash',
    component: DashboardAdminComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'admin-event',
    component: EventsAdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-create-event',
    component: CreateEventAdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-users',
    component: UsersAdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin-settings',
    component: SettingsAdminComponent,
    canActivate: [adminGuard],
  },

  {
    path: 'reset-password-token',
    component: TokenComponent,
  },


  {
    path: 'user-invite',
    component: UserInviteComponent,

  },

];
