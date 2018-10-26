import { createSelector } from 'reselect';

/**
 * Direct selector to the signupConfirm state domain
 */
const selectSignupConfirmDomain = (state) => state.get('signupConfirm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SignupConfirm
 */

const makeSelectSignupConfirm = () => createSelector(
  selectSignupConfirmDomain,
  (substate) => substate.toJS()
);

const makeSelectResendMail = () => createSelector(
  selectSignupConfirmDomain,
  (substate) => substate.get('resendMail')
);

const makeSelectSuccessMessage = () => createSelector(
  selectSignupConfirmDomain,
  (substate) => substate.get('resendSuccess')
);

const makeSelectFailureMessage = () => createSelector(
  selectSignupConfirmDomain,
  (substate) => substate.get('resendFailure')
);


export default makeSelectSignupConfirm;
export {
  selectSignupConfirmDomain,
  makeSelectResendMail,
  makeSelectFailureMessage,
  makeSelectSuccessMessage,
};
