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
import {HeaderComponent} from './components/home/header/header.component';
import {ListTodosComponent} from './components/list-todos/list-todos.component';
import {DeleteTodoBtnComponent} from './components/list-todos/delete-todo-btn/delete-todo-btn.component';
import {ArchivedTodosBtnComponent} from './components/list-archived-todos/archived-todo-btn/archived-todos-btn.component';
import {ListArchivedTodosComponent} from './components/list-archived-todos/list-archived-todos.component';
import {
  RestoreArchivedTodoBtnComponent
} from './components/list-archived-todos/restore-archived-todo-btn/restore-archived-todo-btn.component';
import {DeleteArchivedTodoBtnComponent} from './components/list-archived-todos/delete-archived-todo-btn/delete-archived-todo-btn.component';
import {AddTodoComponent} from "./components/list-todos/add-todo/add-todo.component";
import {SearchTodoBtnComponent} from './components/list-todos/search-todo-btn/search-todo-btn.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {RouteNotFoundComponent} from './components/route-not-found/route-not-found.component';
import {LogoutBtnComponent} from './components/top-bar/logout-btn/logout-btn.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {UserProfileEditComponent} from './components/user-profile/user-profile-edit/user-profile-edit.component';
import {HomeComponent} from './components/home/home.component';
import {WelcomePageComponent} from './components/welcome-page/welcome-page.component';
import {TopBarComponent} from './components/top-bar/top-bar.component';
import {UsernameBtnComponent} from './components/top-bar/username-btn/username-btn.component';
import {HomeBtnComponent} from './components/top-bar/home-btn/home-btn.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListTodosComponent,
    DeleteTodoBtnComponent,
    ArchivedTodosBtnComponent,
    ListArchivedTodosComponent,
    RestoreArchivedTodoBtnComponent,
    DeleteArchivedTodoBtnComponent,
    AddTodoComponent,
    SearchTodoBtnComponent,
    FilterTodosPipe,
    LogInComponent,
    RouteNotFoundComponent,
    LogoutBtnComponent,
    SignUpComponent,
    UserProfileComponent,
    UserProfileEditComponent,
    HomeComponent,
    WelcomePageComponent,
    TopBarComponent,
    UsernameBtnComponent,
    HomeBtnComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
