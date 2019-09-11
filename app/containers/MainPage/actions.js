/*
 *
 * MainPage actions
 *
 */

import { 
  DEFAULT_ACTION,
  SAVE_TRANSACTION,
  SAVE_TRANSACTION_RESULT,
  CLEAR,
  UPLOAD_IMAGE,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_RESULT, 
  UPLOAD_IMAGE_RESULT} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveTransaction(data) {
  return {
    type: SAVE_TRANSACTION,
    data
  };
}
export function saveTransactionResult(data) {
  return {
    type: SAVE_TRANSACTION_RESULT,
    data
  };
}


export function uploadImage(data) {
  return {
    type: UPLOAD_IMAGE,
    data
  };
}
export function uploadImageResult(data) {
  return {
    type: UPLOAD_IMAGE_RESULT,
    data
  };
}

export function getTransactions(data) {
  return {
    type: GET_TRANSACTIONS,
    data
  };
}
export function getTransactionResult(data) {
  return {
    type: GET_TRANSACTIONS_RESULT,
    data
  };
}

export function clear() {
  return {
    type: CLEAR
  };
}