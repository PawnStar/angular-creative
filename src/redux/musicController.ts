import { Store } from 'redux';
import { AppState } from './reducer';

import { Song } from './songs/datatypes'
import { PlayState } from './player/datatypes'
import { Loop } from './songs/datatypes'
import {Howl, Howler} from 'howler';
import { checkAndUpdateDirectiveDynamic } from '@angular/core/src/view/provider';

let song : Howl;
let currentLoop: Loop;

interface MusicController {
  reduxUpdate: (store: Store<AppState>)=>void,
  checkDuration: ()=>void
}

let controller: MusicController = {
  reduxUpdate: (store: Store<AppState>)=>{
    const state = store.getState();
    const currentSong = state.songs[state.player.currentSong];

    /**
     * Play / Pause logic
     */

    // If song not loaded, and we're supposed to play . . . 
    if(state.player.state == PlayState.Playing && !song)
      song = new Howl({
        src: currentSong.src
      })

    // If we were asked to play and we aren't
    if(state.player.state == PlayState.Playing && !song.playing())
      song.play();

    // If we were asked to pause and we're playing
    if(state.player.state != PlayState.Playing && song && song.playing())
      song.pause();

    /**
     * Looping logic
     */
    currentLoop = currentSong.loops[state.player.currentLoopIndex];
  },

  checkDuration: ()=>{
    window.requestAnimationFrame(controller.checkDuration)
    if(!currentLoop)
      return;
    
    if(!song || !song.playing())
      return;

    const currentMS = song.seek() * 1000
    console.log(song.seek())

    if(currentMS > currentLoop.end)
      song.seek(currentLoop.start / 1000)
  }
};

window.requestAnimationFrame(controller.checkDuration)

export default controller;