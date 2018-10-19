import {
  Component,
  Inject,
  ElementRef
} from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from 'redux/store';
import { AppState } from 'redux/reducer';
import { PlayState } from 'redux/player/datatypes';
import * as playerActions from 'redux/player/actions';

@Component({
  selector: 'controls',
  templateUrl: './controls.html',
  styleUrls: ['./controls.css']
})
export class PlayerControls {
  playState: PlayState
  playString: string
  playAction: string

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>,
              private el: ElementRef) {
    store.subscribe(() => this.updateState() );
    this.updateState();
  }

  playPause() {
    if(this.playState == PlayState.Playing)
      this.store.dispatch(playerActions.pause())
    else
      this.store.dispatch(playerActions.play())
  }

  continue(){
    this.store.dispatch(playerActions.continueAfterLoop())
  }

  updateState() {
    const state = this.store.getState();
    this.playState = state.player.state;

    const playStrings = ['Now playing', 'Paused', 'Stopped']
    this.playString = playStrings[this.playState]

    const playActions = ['Pause', 'Play', 'Play']
    this.playAction = playActions[this.playState]
  }
}
