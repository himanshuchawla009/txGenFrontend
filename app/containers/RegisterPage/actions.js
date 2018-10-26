/*
 *
 * RegisterPage actions
 *
 */

import {
  DEFAULT_ACTION, REGISTER_USER, REGISTER_USER_ERROR_MESSAGE_REMOVE , REGISTER_USER_SUCCESS, REGISTER_USER_ERROR,REMOVE_SUCCESS_MESSAGE } from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function registerUser(data) {
  return {
    type: REGISTER_USER,
    data,
  };
}
export function userRegistered(success) {
  return {
    type: REGISTER_USER_SUCCESS,
    success,
  };
}
export function registerError(error) {
  return {
    type: REGISTER_USER_ERROR,
    error,
  };
}
export function removeErrorMessage() {
  return {
    type: REGISTER_USER_ERROR_MESSAGE_REMOVE,
  };
}
export function removeSuccessMessage() {
  return {
    type: REMOVE_SUCCESS_MESSAGE,
  };
}
