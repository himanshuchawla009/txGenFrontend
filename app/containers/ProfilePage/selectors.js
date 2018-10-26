import { createSelector } from 'reselect';

/**
 * Direct selector to the profilePage state domain
 */
const selectProfilePageDomain = (state) => state.get('profilePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.toJS()
);

const makeSelectDetails = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('details')
)

const makeSelectUpdateSuccess = () => createSelector(
  selectProfilePageDomain,
  (substate) => substate.get('updateSuccess')
)
export default makeSelectProfilePage;
export {
  selectProfilePageDomain,
  makeSelectDetails,
  makeSelectUpdateSuccess
};
