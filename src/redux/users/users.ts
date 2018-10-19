import { Reducer, combineReducers } from 'redux';

export interface User {
  name: string,
  avatar: string,
  email: string,
  uuid: string
}

import ListReducer from './listReducer';
import {default as IndexReducer, UserIndex} from './indexReducer';

export interface UsersState {
  list: string[],
  index: UserIndex
}

export const UsersReducer: Reducer<UsersState> = combineReducers<UsersState>({
  list: ListReducer,
  index: IndexReducer
})