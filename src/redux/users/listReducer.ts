import {AddUserAction, ADD_USER} from './actions';
import { Action } from 'redux';

export default function(state: String[] = [], action: Action): String[] {
  if(action.type !== ADD_USER)
    return state;
  
  let act:AddUserAction = action as AddUserAction;

  return [...state, act.user.uuid];
}