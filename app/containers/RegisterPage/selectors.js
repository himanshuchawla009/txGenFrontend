import { createSelector } from 'reselect';

/**
 * Direct selector to the registerPage state domain
 */
const selectRegisterPageDomain = (state) => state.get('registerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () => createSelector(
  selectRegisterPageDomain,
  (substate) => substate.get('user')
);
const makeDetectErrorMessage = () => createSelector(
  selectRegisterPageDomain,
  (substate) => substate.get('errorMessage')
);
const makeDetectSuccessMessage = () => createSelector(
  selectRegisterPageDomain,
  (substate) => substate.get('successMessage')
);

//export default makeSelectRegisterPage;
export {
  selectRegisterPageDomain,
  makeSelectRegisterPage,
  makeDetectErrorMessage,
  makeDetectSuccessMessage,
};
