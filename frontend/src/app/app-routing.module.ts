import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from "./components/log-in/log-in.component";
import {RouteNotFoundComponent} from "./components/route-not-found/route-not-found.component";
import {isAuthGuard} from "./guards/auth.guard";
import {LoginAuthGuard} from "./guards/login-auth.guard";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {SignupAuthGuard} from "./guards/signup-auth.guard";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {UserProfileEditComponent} from "./components/user-profile-edit/user-profile-edit.component";
import {UserProfileResolver} from "./resolvers/user-profile.resolver";
import {HomeComponent} from "./components/home/home.component";
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {isWelcomePageGuard} from "./guards/welcome-page.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    pathMatch: 'full',
    canActivate: [isWelcomePageGuard]
  },
  {
    path: 'todos',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [isAuthGuard]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: {
      user: UserProfileResolver
    },
    canActivate: [isAuthGuard]
  },
  {
    path: 'profile/edit',
    component: UserProfileEditComponent,
    pathMatch: 'full',
    canActivate: [isAuthGuard]
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignUpComponent,
    canActivate: [SignupAuthGuard]
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LogInComponent,
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
