
import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  FA_ENABLED,
  EMAIL_VERIFIED,
  PASSWORD_RESET,
  FA_DISABLED,
  PASSWORD_RESET_INNER,
  REMOVE_ERROR_INNER,
  EMAIL_GLOBAL_CLEAR,
  RESET_OUTER_ERROR,
  REMOVE_OUTER_ERROR,
  PASSWORD_RESET_INNER_REMOVE,
  DEPOSIT_SUCCESS,
  CONTRIBUTION_FORM,
} from './constants';

export function userLoggedIn(repos, email) {
  return {
    type: USER_LOGGED_IN,
    email,
  };
}
export function depositSuccess(data) {
  return {
    type: DEPOSIT_SUCCESS,
    data,
  };
}


export function userLoggedOut() {
  localStorage.removeItem('token');
  return {
    type: USER_LOGGED_OUT,
  };
}
export function twoFactorEnabled(data) {
  return {
    type: FA_ENABLED,
    data,
  };
}
export function twoFactorDisabled(data) {
  return {
    type: FA_DISABLED,
    data,
  };
}

export function emailVerified(data) {
  return {
    type: EMAIL_VERIFIED,
    data,

  };
}
export function passwordReset() {
  return {
    type: PASSWORD_RESET,

  };
}
export function passwordResetInner(data) {
  return {
    type: PASSWORD_RESET_INNER,
    data,

  };
}
export function passwordResetInnerRemove() {
  return {
    type: PASSWORD_RESET_INNER_REMOVE,


  };
}
export function removeErrorGlobal() {
  return {
    type: REMOVE_ERROR_INNER,


  };
}

export function emailGlobalClear() {
  return {
    type: EMAIL_GLOBAL_CLEAR,


  };
}

export function resetOuterError() {
  return {
    type: RESET_OUTER_ERROR,


  };
}
export function removeOuterError() {
  return {
    type: REMOVE_OUTER_ERROR,


  };
}

export function contributionForm(data) {
  return {
    type: CONTRIBUTION_FORM,
    data,


  };
}
