/*
 *
 * Loading actions
 *
 */

import {
  DEFAULT_ACTION, VERIFY_SUCCESS, VERIFY_ERROR, VERIFY_TOKEN,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function verifyToken(data) {
  return {
    type: VERIFY_TOKEN,
    data,
  };
}

export function verifySuccess() {
  return {
    type: VERIFY_SUCCESS,
  };
}
export function verifyError() {
  return {
    type: VERIFY_ERROR,

  };
}
