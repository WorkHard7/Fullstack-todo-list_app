import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInFormComponent} from "./components/log-in-form/log-in-form.component";
import {AppComponent} from "./app.component";
import {RouteNotFoundComponent} from "./components/route-not-found/route-not-found.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginAuthGuard} from "./guards/login-auth.guard";
import {SignUpFormComponent} from "./components/sign-up-form/sign-up-form.component";
import {SignupAuthGuard} from "./guards/signup-auth.guard";

const routes: Routes = [
  {
    path: 'todos',
    pathMatch: 'full',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
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
