/*
 *
 * Loading reducer
 *
 */

import { fromJS } from 'immutable';
import {
  VERIFY_TOKEN, VERIFY_SUCCESS, VERIFY_ERROR,
} from './constants';

const initialState = fromJS({
  verified: false,
  data: '',
  expired: false,

});

function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case VERIFY_TOKEN:
      return state
        .set('data', action.data);
    case VERIFY_SUCCESS:
      return state
        .set('verified', true);
    case VERIFY_ERROR:
      return state
        .set('expired', true);
    default:
      return state;
  }
}

export default loadingReducer;
