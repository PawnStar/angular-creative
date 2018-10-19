/* tslint:disable:typedef */

import { Reducer, combineReducers } from 'redux';

import { UsersState, UsersReducer } from './users/users';
 
 export interface AppState {
  users: UsersState
 }
 
 const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  users: UsersReducer
 });
 
 export default rootReducer;
 