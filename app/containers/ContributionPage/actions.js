/*
 *
 * ContributionPage actions
 *
 */

import {
  DEFAULT_ACTION,
  SELECT_ACTION,
  SUCCESS_DATA,
  FAILURE_DATA,
  GET_DATA,
  CONFIRM_PAYMENT,
  SUCCESS_PAYMENT,
  FAILURE_PAYMENT,
  REMOVE_PAYMENT_FAILURE,
  REMOVE_PAYMENT_SUCCESS,
  RELOAD_PAGE,
  SEND_PAYMENT,
  SUCCESS_SEND_PAYMENT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function selectAction(data) {
  return {
    type: SELECT_ACTION,
    data,
  };
}
export function getData() {
  return {
    type: GET_DATA,
  };
}

export function confirmPayment(data) {
  return {
    type: CONFIRM_PAYMENT,
    data,
  };
}

export function successData(data) {
  return {
    type: SUCCESS_DATA,
    data,
  };
}
export function failureData(token) {
  return {
    type: FAILURE_DATA,
    token,
  };
}

export function successPayment(data) {
  return {
    type: SUCCESS_PAYMENT,
    data,
  };
}
export function failurePayment(data) {
  return {
    type: FAILURE_PAYMENT,
    data,
  };
}
export function removeSuccessPayment() {
  return {
    type: REMOVE_PAYMENT_SUCCESS,
  };
}
export function removeFaiurePayment() {
  return {
    type: REMOVE_PAYMENT_FAILURE,
  };
}

export function reload() {
  return {
    type: RELOAD_PAGE,
  };
}

export function finalizePayment(data) {
  return {
    type: SEND_PAYMENT,
    data,
  };
}
export function successFinalizePayment(data) {
  return {
    type: SUCCESS_SEND_PAYMENT,
    data,
  };
}
