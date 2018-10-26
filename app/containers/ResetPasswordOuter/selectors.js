import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPasswordOuter state domain
 */
const selectResetPasswordOuterDomain = (state) => state.get('resetPasswordOuter');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ResetPasswordOuter
 */

const makeSelectResetPasswordOuter = () => createSelector(
  selectResetPasswordOuterDomain,
  (substate) => substate.toJS()
);
const makeSelectResetToken = () => createSelector(
  selectResetPasswordOuterDomain,
  (substate) => substate.get('resetToken')
);
const makeSelectNewPassword = () => createSelector(
  selectResetPasswordOuterDomain,
  (substate) => substate.get('newPassword')
);
const makeSelectResetSuccess = () => createSelector(
  selectResetPasswordOuterDomain,
  (substate) => substate.get('success')
);
const makeSelectResetError = () => createSelector(
  selectResetPasswordOuterDomain,
  (substate) => substate.get('error')
);
const makeSelectResetErrorMessage = () => createSelector(
  selectResetPasswordOuterDomain,
  (substate) => substate.get('errorMessage')
);
const makeSelectResetSuccessMessage = () => createSelector(
  selectResetPasswordOuterDomain,
  (substate) => substate.get('successMessage')
);
export default makeSelectResetPasswordOuter;
export {
  selectResetPasswordOuterDomain,
  makeSelectResetToken,
  makeSelectNewPassword,
  makeSelectResetError,
  makeSelectResetSuccess,
  makeSelectResetErrorMessage,
  makeSelectResetSuccessMessage,
};
