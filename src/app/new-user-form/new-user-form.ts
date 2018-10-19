import {Component,Inject,ElementRef} from '@angular/core';
import * as Redux from 'redux';
import {User} from '../../redux/users/users';

import {AppStore} from 'redux/store';
import {AppState} from 'redux/reducer';
import {uuid} from '../../util/uuid';

import {addUser} from '../../redux/users/actions';

@Component({
  selector: 'new-user-form',
  templateUrl: './new-user-form.html',
  styleUrls: ['./new-user-form.css']
})
export class NewUserForm {
  user = {
    name: '',
    email: '',
    avatar: ''
  };

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>,
              private el: ElementRef) { }

  add(user): void {
    if(!(user.name.trim() || user.email.trim()))
      return console.error('Need either name or email')    

    this.store.dispatch(addUser({
      ...user,
      uuid: uuid()
    }));

    user.name = ''
    user.email = ''
    user.avatar = ''
  }
}
