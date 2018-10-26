import { createSelector } from 'reselect';

/**
 * Direct selector to the loading state domain
 */
const selectLoadingDomain = (state) => state.get('loading');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Loading
 */

const makeSelectLoading = () => createSelector(
  selectLoadingDomain,
  (substate) => substate.toJS()
);

const makeSelectVerified = () => createSelector(
  selectLoadingDomain,
  (substate) => substate.get('verified')
);

const makeSelectExpired = () => createSelector(
  selectLoadingDomain,
  (substate) => substate.get('expired')
);
const makeSelectToken = () => createSelector(
  selectLoadingDomain,
  (substate) => substate.get('data')
);
export default makeSelectLoading;
export {
  selectLoadingDomain,
  makeSelectExpired,
  makeSelectVerified,
  makeSelectToken,
};
