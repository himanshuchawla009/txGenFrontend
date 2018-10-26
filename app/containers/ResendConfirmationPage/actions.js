/*
 *
 * ResendConfirmationPage actions
 *
 */

import {
  DEFAULT_ACTION,
  RESEND_MAIL,
  RESEND_MAIL_ERROR,
  RESEND_MAIL_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function resendMail(data) {
  return {
    type: RESEND_MAIL,
    data
  };
}

export function resendError(data) {
  return {
    type: RESEND_MAIL_ERROR,
    data
  };
}

export function resendSuccess(data) {
  return {
    type: RESEND_MAIL_SUCCESS,
    data
  }
}