/*
 *
 * TransactionHistory reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, GET_TRANSACTIONS, SUCCESS_TRANSACTIONS,
} from './constants';

const initialState = fromJS({
  transactions: [],
  page: '',
  nextPage: false,
});

function transactionHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUCCESS_TRANSACTIONS:
      return state
        .set('transactions', action.data.transactions)
        .set('nextPage', action.data.nextPage);
    case GET_TRANSACTIONS:
      return state
        .set('page', action.data);
    default:
      return state;
  }
}

export default transactionHistoryReducer;
