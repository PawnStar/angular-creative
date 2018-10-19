import {
  Component,
  Inject,
  ElementRef
} from '@angular/core';
import * as Redux from 'redux';

import { AppStore } from 'redux/store';
import {
  AppState
} from 'redux/reducer';

@Component({
  selector: 'redux-state',
  templateUrl: './redux-state.html',
  styleUrls: ['./redux-state.css']
})
export class ReduxStateComponent {
  stateString: String

  constructor(@Inject(AppStore) private store: Redux.Store<AppState>,
              private el: ElementRef) {
    store.subscribe(() => this.updateState() );
    this.updateState();
  }

  updateState() {
    const state = this.store.getState();
    this.stateString = JSON.stringify(state, null, 2);
  }
}
