import { Store } from 'redux';
import { AppState } from './reducer';

import { Song } from './songs/datatypes'
import { PlayState } from './player/datatypes'
import { Loop } from './songs/datatypes'
import {Howl, Howler} from 'howler';
import * as playerActions from './player/actions'
import { animation } from '@angular/core/src/animation/dsl';

let song : Howl;
let currentLoop: Loop;
let currentDuration: number;
let currentPosition: number;
let cache : Store<AppState>;

interface MusicController {
  reduxUpdate: (store: Store<AppState>)=>void,
  checkDuration: ()=>void
}

let controller: MusicController = {
  reduxUpdate: (store: Store<AppState>)=>{
    const state = store.getState();
    const currentSong = state.songs[state.player.currentSong];

    // Preload
    if(state.player.currentSong && !song){
      console.log('loading')
      song = new Howl({
        src: currentSong.src
      })

      song.once('load', ()=>{
        console.log('loaded')
        store.dispatch(playerActions.setDuration(song.duration()))
      })
    }

    /**
     * Play / Pause logic
     */

    // If we were asked to play and we aren't
    if(state.player.state == PlayState.Playing && song && !song.playing())
      song.play();

    // If we were asked to pause and we're playing
    if(state.player.state != PlayState.Playing && song && song.playing())
      song.pause();

    /**
     * Store variables for checkDuration
     */
    currentLoop = currentSong.loops[state.player.currentLoopIndex];
    currentDuration = state.player.duration;
    currentPosition = state.player.position;

    if(!cache)
      cache = store;
  },

  checkDuration: ()=>{
    window.requestAnimationFrame(controller.checkDuration)
    
    if(!song || !song.playing())
      return;

    // If song loaded, update UI
    if(currentDuration !== song.duration())
      cache.dispatch(playerActions.setDuration(song.duration()))

    if(currentPosition !== song.seek())
      cache.dispatch(playerActions.setPosition(song.seek()))

    const currentMS = song.seek() * 1000

    if(!currentLoop)
      return;

    if(currentMS > currentLoop.end)
      song.seek(currentLoop.start / 1000)
  }
};

window.requestAnimationFrame(controller.checkDuration)

export default controller;