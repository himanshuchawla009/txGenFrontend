import { createSelector } from 'reselect';

/**
 * Direct selector to the contributionPage state domain
 */
const selectContributionPageDomain = (state) => state.get('contributionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ContributionPage
 */

const makeSelectContributionPage = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.toJS()
);
const makeSelectContributionCurrency = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('currency')
);
const makeSelectContributionData = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('success').toJS()
);

const makeSelectContributionConfirm = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentConfirm').toJS()
);

const makeSelectContributionSuccess = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentSuccess')
);
const makeSelectPaymentId = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentId')
);
const makeSelectFinalTransaction = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('finalConfirm').toJS()
);

const makeSelectContributionFailure = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentFailure')
);

const makeSelectTransactionId = () => createSelector(
  selectContributionPageDomain,
  (substate) => substate.get('paymentId')
);

export default makeSelectContributionPage;
export {
  selectContributionPageDomain,
  makeSelectContributionCurrency,
  makeSelectContributionData,
  makeSelectContributionConfirm,
  makeSelectContributionFailure,
  makeSelectContributionSuccess,
  makeSelectPaymentId,
  makeSelectFinalTransaction,
  makeSelectTransactionId,
};
