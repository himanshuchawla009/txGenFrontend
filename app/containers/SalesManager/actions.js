/*
 *
 * SalesManager actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_REQUESTS,
  GET_USER_REQUESTS,
  SET_USER_REQUESTS,
  SET_ALL_REQUESTS,
  BUY_REQUEST,
  SELL_REQUEST,
  SELL_REQUEST_CLEAR,
  SELL_REQUEST_FAIL,
  BUY_REQUEST_CLEAR,
  BUY_REQUEST_FAIL,
  BUY_REQUEST_SUCCESS,
  SELL_REQUEST_SUCCESS,
  SET_BUY_REQUESTS,
  SET_SELL_REQUESTS,

} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function buyRequest(data) {
  console.log("Actoion trifu")
  return {
    type: BUY_REQUEST,
    data,
  };
}

export function sellRequest(data) {
  return {
    type: SELL_REQUEST,
    data,
  };
}

export function getAllRequests() {
  return {
    type: GET_ALL_REQUESTS,

  };
}

export function setAllRequests(data) {
  return {
    type: SET_ALL_REQUESTS,
    data,

  };
}

export function clearBuyRequest() {
  return {
    type: BUY_REQUEST_CLEAR,
   

  };
}

export function sellRequestClear() {
  return {
    type: SELL_REQUEST_CLEAR,
   

  };
}
export function sellRequestFail() {
  return {
    type: SELL_REQUEST_FAIL,
   

  };
}

export function buyRequestFail() {
  return {
    type: BUY_REQUEST_FAIL,
   

  };
}

export function sellRequestSuccess() {
  return {
    type: SELL_REQUEST_SUCCESS,
   

  };
}

export function buyRequestSuccess() {
  return {
    type: BUY_REQUEST_SUCCESS,
  };
}

export function getUserRequests() {
  return {
    type: GET_USER_REQUESTS,
  };
}

export function setUserRequests(data) {
  return {
    type: SET_USER_REQUESTS,
    data,
  };
}


export function setBuyRequests(data) {
  return {
    type: SET_BUY_REQUESTS,
    data,
  };
}


export function setSellRequests(data) {
  return {
    type: SET_SELL_REQUESTS,
    data,
  };
}
