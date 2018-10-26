/*
 *
 * Support reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_SUPPORT, SUBMIT_SUPPORT_SUCCESS,
} from './constants';

const initialState = fromJS({});

function supportReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUBMIT_SUPPORT:
      return state
      .set('supportData', action.data);
    case SUBMIT_SUPPORT_SUCCESS:
      return state
      .set('supportSuccess', action.data);
    default:
      return state;
  }
}

export default supportReducer;
