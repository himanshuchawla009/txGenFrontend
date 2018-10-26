/*
 *
 * ForgotPassword actions
 *
 */

import {
  DEFAULT_ACTION, FORGOT_PASSWORD, MAIL_SENT, MAIL_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function forgotPassword(data) {
  return {
    type: FORGOT_PASSWORD,
    data,

  };
}

export function mailSent(data) {
  return {
    type: MAIL_SENT,
    data,
  };
}

export function mailError(data) {
  return {
    type: MAIL_ERROR,
    data,


  };
}
