import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {
  AppState,
  default as reducer
} from '../redux/reducer';

import { AppComponent } from './app.component';
import { ReduxStateComponent } from './redux-state/redux-state';
import { NewUserForm } from './new-user-form/new-user-form';
import { UserList } from './user-list/user-list';

import {
  AppStore,
  appStoreProviders
} from 'redux/store';

@NgModule({
  declarations: [
    AppComponent,
    ReduxStateComponent,
    NewUserForm,
    UserList
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    appStoreProviders
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
