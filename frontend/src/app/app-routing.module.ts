import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInFormComponent} from "./components/log-in-form/log-in-form.component";
import {RouteNotFoundComponent} from "./components/route-not-found/route-not-found.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginAuthGuard} from "./guards/login-auth.guard";
import {SignUpFormComponent} from "./components/sign-up-form/sign-up-form.component";
import {SignupAuthGuard} from "./guards/signup-auth.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {UserProfileGuard} from "./guards/user-profile.guard";
import {UserProfileEditComponent} from "./components/user-profile-edit/user-profile-edit.component";
import {UserProfileResolver} from "./resolvers/user-profile.resolver";
import {HomeComponent} from "./components/home/home.component";
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {WelcomePageGuard} from "./guards/welcome-page.guard";

const routes: Routes = [
  {
    path: 'todos',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: WelcomePageComponent,
    pathMatch: 'full',
    canActivate: [WelcomePageGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: {
      user: UserProfileResolver
    },
    canActivate: [UserProfileGuard],
  },
  {
    path: 'profile/edit',
    component: UserProfileEditComponent,
    pathMatch: 'full',
    canActivate: [UserProfileGuard]
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignUpFormComponent,
    canActivate: [SignupAuthGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LogInFormComponent,
    canActivate: [LoginAuthGuard]
  },
  {
    path: '**',
    component: RouteNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
