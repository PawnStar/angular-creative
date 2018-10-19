import {Action,ActionCreator} from 'redux';
import {PlayerState} from './datatypes';

// Add user
export const PAUSE = '[Player] Pause';
export const PLAY = '[Player] Play';
export const CONTINUE = '[Player] Continue';

export interface PlayAction extends Action {}
export interface PauseAction extends Action {}
export interface ContinueAction extends Action {}

export const play: ActionCreator<PlayAction> = () => ({type: PLAY});
export const pause: ActionCreator<PauseAction> = () => ({type: PAUSE});
export const continueAfterLoop: ActionCreator<ContinueAction> = () => ({type: CONTINUE});
