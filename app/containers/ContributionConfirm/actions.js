/*
 *
 * ContributionConfirm actions
 *
 */

import {
  DEFAULT_ACTION, CONFIRM_PAYMENT, SUCCESS_PAYMENT, FAILURE_PAYMENT, REMOVE_PAYMENT_SUCCESS, REMOVE_PAYMENT_FAILURE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function confirmPayment() {
  return {
    type: CONFIRM_PAYMENT,
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
