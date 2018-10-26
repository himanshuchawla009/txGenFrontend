/*
 *
 * ResetPasswordOuter actions
 *
 */

import {
  DEFAULT_ACTION, RESET_PASSWORD, RESET_SUCCESS, RESET_ERROR, RESET_REMOVE,
} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function resetPassword(data) {
  return {
    type: RESET_PASSWORD,
    data,
  };
}
export function resetSuccess(data) {
  return {
    type: RESET_SUCCESS,
    data,
  };
}
export function resetError(data) {
  return {
    type: RESET_ERROR,
    data,
  };
}
export function removeReset() {
  return {
    type: RESET_REMOVE,
  };
}
