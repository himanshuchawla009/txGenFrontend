
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_ERROR_MESSAGE_REMOVE,
  EMAIL_STATE_CLEAR,
} from './constants';


export function loginUser(data) {
  return {
    type: LOGIN_USER,
    data,
  };
}

export function userLoaded(userData) {
  return {
    type: LOGIN_USER_SUCCESS,
    userData,
  };
}

export function saveToken(token) {
  localStorage.setItem('token', token);
  return {
    type: 'SAVED_TOKEN',
  };
}

export function userLoadingError(error) {
  return {
    type: LOGIN_USER_ERROR,
    error,
  };
}
export function removeErrorMessage() {
  return {
    type: LOGIN_USER_ERROR_MESSAGE_REMOVE,
  };
}
export function emailVerified(data) {
  return {
    type: EMAIL_VERIFIED,
    data,

  };
}

export function emailStateClear() {
  return {
    type: EMAIL_STATE_CLEAR,


  };
}
