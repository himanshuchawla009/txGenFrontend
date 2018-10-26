/*
 *
 * SecurityPage actions
 *
 */

import {
  DEFAULT_ACTION,
  ENABLE_2FA,
  DISABLE_2FA,
  SUCCESS_2FA,
  VERIFY_2FA,
  REMOVE_RESPONSE,
  RESPONSE_2FA,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function enable2fa() {
  return {
    type: ENABLE_2FA,

  };
}
export function success2fa(data) {
  return {
    type: SUCCESS_2FA,
    data,

  };
}
export function disable2fa() {
  return {
    type: DISABLE_2FA,

  };
}
export function verify2fa(data) {
  return {
    type: VERIFY_2FA,
    data,

  };
}
export function response2fa(data) {
  return {
    type: RESPONSE_2FA,
    data,

  };
}
export function removeResponse() {
  return {
    type: REMOVE_RESPONSE,


  };
}
