import { createSelector } from 'reselect';

/**
 * Direct selector to the resendConfirmationPage state domain
 */
const selectResendConfirmationPageDomain = (state) => state.get('resendConfirmationPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ResendConfirmationPage
 */

const makeSelectResendConfirmationPage = () => createSelector(
  selectResendConfirmationPageDomain,
  (substate) => substate.toJS()
);

const makeSelectResendData = () => createSelector(
  selectResendConfirmationPageDomain,
  (substate) => substate.get('data')
);

const makeSelectResendError = () => createSelector(
  selectResendConfirmationPageDomain,
  (substate) => substate.get('resendError')
);

const makeSelectResendSuccess = () => createSelector(
  selectResendConfirmationPageDomain,
  (substate) => substate.get('resendSuccess')
);

export default makeSelectResendConfirmationPage;
export {
  selectResendConfirmationPageDomain,
  makeSelectResendData,
  makeSelectResendError,
  makeSelectResendSuccess,
};
