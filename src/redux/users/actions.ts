/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Action,ActionCreator} from 'redux';
import {User} from './users';

// Add user
export const ADD_USER = '[User] Add';
export interface AddUserAction extends Action {
  user: User;
}

export const addUser: ActionCreator<AddUserAction> =
  (user: User) => ({
    type: ADD_USER,
    user: user
  });
