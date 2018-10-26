import { createSelector } from 'reselect';

/**
 * Direct selector to the redirectPage state domain
 */
const selectRedirectPageDomain = (state) => state.get('redirectPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RedirectPage
 */

const makeSelectRedirectPage = () => createSelector(
  selectRedirectPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectRedirectPage;
export {
  selectRedirectPageDomain,
};
