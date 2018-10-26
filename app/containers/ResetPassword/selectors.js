import { createSelector } from 'reselect';

/**
 * Direct selector to the resetPassword state domain
 */
const selectResetPasswordDomain = (state) => state.get('resetPassword');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ResetPassword
 */

const makeSelectResetPassword = () => createSelector(
  selectResetPasswordDomain,
  (substate) => substate.toJS()
);


const makeSelectResetSuccess = () => createSelector(
  selectResetPasswordDomain,
  (substate) => substate.get('resetSuccess')
);

const makeSelectResetError = () => createSelector(
  selectResetPasswordDomain,
  (substate) => substate.get('resetError')

);


export default makeSelectResetPassword;
export {
  selectResetPasswordDomain,
  makeSelectResetError,
  makeSelectResetSuccess,
};
