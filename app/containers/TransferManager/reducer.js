/*
 *
 * TransferManager reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SUCCESS_GET_REQUEST,
  SUCCESS_REQUEST,
  FAIL_GET_REQUEST,
  FAIL_REQUEST,
  CLEAR_STATE,
  CREATE_REQUEST,
} from './constants';

const initialState = fromJS({
  successRequest: false,
  failRequest: false,
  allRequests: {},
  requestData: {},
  failGettingRequests: false,


});

function transferManagerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUCCESS_GET_REQUEST:
      return state
        .set('allRequests', action.data);
    case CREATE_REQUEST:
      return state
        .set('requestData', action.data);
    case SUCCESS_REQUEST:
      return state
        .set('successRequest', true)
        .set('failGettingRequests', false);
    case FAIL_GET_REQUEST:
      return state
        .set('failGettingRequests', true);
    case FAIL_REQUEST:
      return state
        .set('failRequests', true)
        .set('successRequest', false);
    case CLEAR_STATE:
      return state
        .set('failRequests', false)
        .set('successRequest', false)
        .set('failGettingRequests', false);
    default:
      return state;
  }
}

export default transferManagerReducer;
