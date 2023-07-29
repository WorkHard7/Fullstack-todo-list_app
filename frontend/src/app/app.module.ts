import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AdaptiveModule, DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, ChipModule, ListModule} from "@progress/kendo-angular-buttons";
import {GridModule} from "@progress/kendo-angular-grid";
import {HttpClientModule} from "@angular/common/http";

import {FilterTodosPipe} from './pipes/filter-todos.pipe';

import {AppComponent} from './app.component';
import {AddTodoComponent} from './components/add-todo/add-todo.component';
import {HeaderComponent} from './components/header/header.component';
import {ListTodosComponent} from './components/list-todos/list-todos.component';
import {DeleteTodoBtnComponent} from './components/delete-todo-btn/delete-todo-btn.component';
import {ArchivedTodosBtnComponent} from './components/archived-todo-btn/archived-todos-btn.component';
import {ListArchivedTodosComponent} from './components/list-archived-todos/list-archived-todos.component';
import {
  RestoreArchivedTodoBtnComponent
} from './components/restore-archived-todo-btn/restore-archived-todo-btn.component';
import {DeleteArchivedTodoBtnComponent} from './components/delete-archived-todo-btn/delete-archived-todo-btn.component';
import {AddTodoBtnComponent} from "./components/add-todo-btn/add-todo-btn.component";
import {SearchTodoBtnComponent} from './components/search-todo-btn/search-todo-btn.component';
import {LogInFormComponent} from './components/log-in-form/log-in-form.component';
import {RouteNotFoundComponent} from './components/route-not-found/route-not-found.component';
import {LogoutBtnComponent} from './components/logout-btn/logout-btn.component';
import {AuthGuard} from "./guards/auth.guard";
import {SignUpFormComponent} from './components/sign-up-form/sign-up-form.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserProfileEditComponent} from './components/user-profile-edit/user-profile-edit.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {WelcomePageComponent} from './components/welcome-page/welcome-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    HeaderComponent,
    ListTodosComponent,
    DeleteTodoBtnComponent,
    ArchivedTodosBtnComponent,
    ListArchivedTodosComponent,
    RestoreArchivedTodoBtnComponent,
    DeleteArchivedTodoBtnComponent,
    AddTodoBtnComponent,
    SearchTodoBtnComponent,
    FilterTodosPipe,
    LogInFormComponent,
    RouteNotFoundComponent,
    LogoutBtnComponent,
    SignUpFormComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    HomeComponent,
    NavbarComponent,
    WelcomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    DateInputsModule,
    BrowserAnimationsModule,
    ButtonModule,
    AdaptiveModule,
    ChipModule,
    ListModule,
    GridModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
