/*
 *
 * TransferManager actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_REQUEST,
  SUCCESS_GET_REQUEST,
  FAIL_GET_REQUEST,
  CREATE_REQUEST,
  SUCCESS_REQUEST,
  FAIL_REQUEST,
  CLEAR_STATE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createRequest(data) {
  return {
    type: CREATE_REQUEST,
    data,
  };
}

export function successRequest() {
  return {
    type: SUCCESS_REQUEST,
  };
}
export function failRequest() {
  return {
    type: FAIL_REQUEST,
  };
}

export function getRequests() {
  return {
    type: GET_REQUEST,
  };
}
export function successGetRequests(data) {
  return {
    type: SUCCESS_GET_REQUEST,
    data,
  };
}
export function failGetRequests() {
  return {
    type: FAIL_GET_REQUEST,
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}


