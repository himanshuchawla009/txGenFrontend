import { createSelector } from 'reselect';

/**
 * Direct selector to the signUpPage state domain
 */
const selectLoginPageDomain = (state) => state.get('loginPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignUpPage
 */

const makeSelectUser = () => createSelector(
  selectLoginPageDomain,
  (substate) => substate.get('user').toJS()
);

const makeDetectErrorMessage = () => createSelector(
  selectLoginPageDomain,
  (substate) => substate.get('errorMessage')
);
const makeDetectError = () => createSelector(
  selectLoginPageDomain,
  (substate) => substate.get('error')
);


// export default makeSelectLoginPage;
export {
  selectLoginPageDomain,
  makeSelectUser,
  makeDetectErrorMessage,
  makeDetectError

};
