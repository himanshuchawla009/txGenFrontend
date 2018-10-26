/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, UPDATE_DETAILS, UPDATE_DETAILS_SUCCESS, RESET_SUCCESS,
} from './constants';

const initialState = fromJS({});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_DETAILS:
      return state
        .set('details', action.data)
    case UPDATE_DETAILS_SUCCESS:
      return state
        .set('updateSuccess', action.data)
    case RESET_SUCCESS:
      return state
        .set('updateSuccess', false)
    default:
      return state;
  }
}

export default profilePageReducer;
