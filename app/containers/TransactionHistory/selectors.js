import { createSelector } from 'reselect';

/**
 * Direct selector to the transactionHistory state domain
 */
const selectTransactionHistoryDomain = (state) => state.get('transactionHistory');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TransactionHistory
 */

const makeSelectTransactionHistory = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.toJS()
);
const makeSelectTransactions = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('transactions')
);
const makeSelectPage = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('page')
);

const makeSelectNextPage = () => createSelector(
  selectTransactionHistoryDomain,
  (substate) => substate.get('nextPage')
);

export default makeSelectTransactionHistory;
export {
  selectTransactionHistoryDomain,
  makeSelectTransactions,
  makeSelectPage,
  makeSelectNextPage,
};
