import {Component,Inject,ElementRef} from '@angular/core';
import * as Redux from 'redux';
import {User} from '../../redux/users/users';

import {AppStore} from 'redux/store';
import {AppState} from 'redux/reducer';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserList {
  users: User[]

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>,
              private el: ElementRef) {
    store.subscribe(()=>this.updateState())
    this.updateState()
  }

  updateState(){
    const state = this.store.getState()
    this.users = state.users.list.map(uuid=>state.users.index[uuid])
  }
}
