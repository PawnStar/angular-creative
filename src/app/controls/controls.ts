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
import { Loop } from 'redux/songs/datatypes';

@Component({
  selector: 'controls',
  templateUrl: './controls.html',
  styleUrls: ['./controls.css']
})
export class PlayerControls {
  playState: PlayState
  playString: string
  playAction: string
  duration: number
  position: string
  currentLoop: string  

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>,
              private el: ElementRef) {
    store.subscribe(() => this.updateState() );
    store.dispatch({type: 'NOOP'})
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

    this.duration = state.player.duration
    this.position = 100 * (state.player.position / state.player.duration) + '%'

    if(this.playState == PlayState.Playing){
      let loop = state.songs[state.player.currentSong].loops[state.player.currentLoopIndex]
      if(!loop){
        this.currentLoop = 'Playing until end of song'
      }else {
        if(state.player.position * 1000 < loop.start)
          this.currentLoop = `Playing until loop "${loop.name}"`
        else
          this.currentLoop = `Looping "${loop.name}"`
      }

      this.playString = this.currentLoop
    }

  }
}
