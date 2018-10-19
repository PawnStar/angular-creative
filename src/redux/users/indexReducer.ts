import { User } from './users';
import {AddUserAction, ADD_USER} from './actions';
import { Action } from 'redux';

export interface UserIndex{
  [s: string]: User
}

export default function(state: UserIndex = {}, action: Action): UserIndex {
  if(action.type !== ADD_USER)
    return state;

  let act:AddUserAction = action as AddUserAction;

  return {
    ...state,
    [act.user.uuid]: act.user
  };
}