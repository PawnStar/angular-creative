import * as actions from './actions';
import { Action } from 'redux';
import { PlayerState, PlayState } from './datatypes'
import { applySourceSpanToStatementIfNeeded } from '@angular/compiler/src/output/output_ast';

const defaultState : PlayerState = {
  state: PlayState.Stopped,
  currentSong: 'furi',
  currentLoopIndex: 0
}

export default function(state: PlayerState = defaultState, action: Action): PlayerState {
  switch(action.type){
    case actions.PLAY:
      return {
        ...state,
        state: PlayState.Playing
      }
    case actions.PAUSE:
      return {
        ...state,
        state: PlayState.Paused
      }
    case actions.CONTINUE:
      if(state.state != PlayState.Playing)
        return state;
      return {
        ...state,
        currentLoopIndex: state.currentLoopIndex + 1
      }
    default:
      return state;
  }
}