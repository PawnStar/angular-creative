export enum PlayState {
  Playing,
  Paused,
  Stopped
}

export interface PlayerState {
  state: PlayState,
  currentSong: string
  currentLoopIndex: number
}