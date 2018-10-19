import {AddSongAction, ADD_SONG} from './actions';
import { Action } from 'redux';
import { SongsState } from './datatypes'

const defaultState : SongsState = {
  'furi': {
    name: 'Furi 01',
    src: [
      './assets/furi01.mp3'
    ],
    loops: [
      {start: 7674, end: 11505},
      {start: 19444, end: 19458},
      {start: 19563, end: 27196},
      {start: 34818, end: 50085},
      {start: 57432, end: 61255}
    ],
    uuid: 'furi'
  }
}

export default function(state: SongsState = defaultState, action: Action): SongsState {
  if(action.type !== ADD_SONG)
    return state;
  
  let act:AddSongAction = action as AddSongAction;

  return {
    ...state,
    [act.song.uuid]: act.song
  }
}