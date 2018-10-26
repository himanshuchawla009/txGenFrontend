/*
 *
 * TransactionHistory actions
 *
 */

import {
  DEFAULT_ACTION, GET_TRANSACTIONS, SUCCESS_TRANSACTIONS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTransactions(data) {
  return {
    type: GET_TRANSACTIONS,
    data,
  };
}

export function successTransactions(data) {
  return {
    type: SUCCESS_TRANSACTIONS,
    data,
  };
}
