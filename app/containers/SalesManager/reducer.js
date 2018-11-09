/*
 *
 * SalesManager reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SELL_REQUEST_FAIL,
  SELL_REQUEST_SUCCESS,
  BUY_REQUEST_FAIL,
  BUY_REQUEST_SUCCESS,
  SET_ALL_REQUESTS,
  SET_USER_REQUESTS,
  BUY_REQUEST_CLEAR,
  SELL_REQUEST_CLEAR,
  BUY_REQUEST,
  SELL_REQUEST,
  SET_BUY_REQUESTS,
  SET_SELL_REQUESTS,
} from './constants';

const initialState = fromJS({
  allRequests: [],
  userRequests: [],
  buyData: {},
  sellData: {},
  buyFail: false,
  sellFail: false,
  buySuccess: false,
  sellSuccess: false,
  buyRequests: [],
  sellRequests: [],

});

function salesManagerReducer(state = initialState, action) {
  console.log(action.data);
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case BUY_REQUEST:
      return state
        .set('buyData', action.data);
    case SELL_REQUEST:
      return state
        .set('sellData', action.data);
    case BUY_REQUEST_FAIL:
      return state
        .set('buyFail', true);
    case BUY_REQUEST_SUCCESS:
      return state
        .set('buySuccess', true);
    case SELL_REQUEST_FAIL:
      return state
        .set('sellFail', true);
    case SELL_REQUEST_SUCCESS:
      return state
        .set('sellSuccess', true);
    case SET_ALL_REQUESTS:
      return state
        .set('allRequests', action.data);

    case SET_USER_REQUESTS:
      return state
        .set('userRequests', action.data);
    case BUY_REQUEST_CLEAR:
      return state
        .set('buyFail', false)
        .set('buySuccess', false);
    case SELL_REQUEST_CLEAR:
      return state
        .set('sellFail', false)
        .set('sellSuccess', false);
    case SET_BUY_REQUESTS:
      return state
        .set('buyRequests', action.data);
    case SET_SELL_REQUESTS:
      return state
        .set('sellRequests', action.data);
    default:
      return state;
  }
}

export default salesManagerReducer;
