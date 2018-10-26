import { createSelector } from 'reselect';

/**
 * Direct selector to the forgotPassword state domain
 */
const selectForgotPasswordDomain = (state) => state.get('forgotPassword');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ForgotPassword
 */

const makeSelectForgotPassword = () => createSelector(
  selectForgotPasswordDomain,
  (substate) => substate.get('data')
);
const makeSelectMail = () => createSelector(
  selectForgotPasswordDomain,
  (substate) => substate.get('mailSent')
);
const makeSelectError = () => createSelector(
  selectForgotPasswordDomain,
  (substate) => substate.get('mailError')
);


export default makeSelectForgotPassword;
export {
  selectForgotPasswordDomain,
  makeSelectMail,
  makeSelectError,
};
