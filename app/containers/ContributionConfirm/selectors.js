import { createSelector } from 'reselect';

/**
 * Direct selector to the contributionConfirm state domain
 */
const selectContributionConfirmDomain = (state) => state.get('contributionConfirm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ContributionConfirm
 */

const makeSelectContributionConfirm = () => createSelector(
  selectContributionConfirmDomain,
  (substate) => substate.get('paymentConfirm')
);

const makeSelectContributionSuccess = () => createSelector(
  selectContributionConfirmDomain,
  (substate) => substate.get('paymentSuccess')
);

const makeSelectContributionFailure = () => createSelector(
  selectContributionConfirmDomain,
  (substate) => substate.get('paymentFailure')
);

export default makeSelectContributionConfirm;
export {
  selectContributionConfirmDomain,
  makeSelectContributionFailure,
  makeSelectContributionSuccess,
};
