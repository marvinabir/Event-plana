import { Routes } from '@angular/router';
import { AuthGuard,RoleGuard } from './guards/auth.guard';
import { LandingPageComponent } from './components/landing/landing-page/landing-page.component';
import { UserManagementComponent } from './components/super-admin/user-management/user-management.component';
import { EventOversightComponent } from './components/super-admin/event-oversight/event-oversight.component';
import { AdminAnalyticsComponent } from './components/super-admin/admin-analytics/admin-analytics.component';
import { ManageEventComponent } from './components/manager/manage-event/manage-event.component';
import { AdminAnalyicsComponent } from './components/analytics/admin-analyics/admin-analyics.component';
import { EventListComponent } from './components/user-dashboard/event-list/event-list.component';
import { EventDetailComponent } from './components/user-dashboard/event-detail/event-detail.component';
import { RegistrationComponent } from './components/landing/registration/registration.component';
import { LoginComponent } from './components/landing/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MyBookingsComponent} from './components/user-dashboard/my-bookings/my-bookings.component';
import { ProfileComponent } from './components/user-dashboard/profile/profile.component';
import { UpdateRoleComponent } from './components/super-admin/update-role/update-role.component';
import { ManagerProfileComponent } from './components/manager/manager-profile/manager-profile.component';
import { AdminProfileComponent } from './components/super-admin/admin-profile/admin-profile.component';
import { ProfileManagementComponent } from './components/user-dashboard/profile-management/profile-management.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'su', component: UserManagementComponent },
  { path: 'an', component: AdminAnalyticsComponent },
  { path: 'os', component: EventOversightComponent },
  { path: 'me', component: ManageEventComponent },
  { path: 'mp', component: ManagerProfileComponent },
  { path: 'li', component: AdminAnalyicsComponent },
  { path: 'el', component: EventListComponent },
  {  path: 'event/:id', component: EventDetailComponent },
  { path: 'my-bookings', component: MyBookingsComponent },
  { path: 'reset', component: ProfileComponent },
  { path: 'role', component: UpdateRoleComponent },
  { path: 'ap', component: AdminProfileComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  // { path: '', component: ProfileManagementComponent },
  { path: '**', component: NotFoundComponent }
  
];
