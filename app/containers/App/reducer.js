/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  FA_ENABLED,
  EMAIL_VERIFIED,
  PASSWORD_RESET,
  FA_DISABLED,
  PASSWORD_RESET_INNER,
  REMOVE_ERROR_INNER,
  REMOVE_GLOBAL_CLEAR,
  RESET_OUTER_ERROR,
  REMOVE_OUTER_ERROR,
  PASSWORD_RESET_INNER_REMOVE,
  DEPOSIT_SUCCESS,
  CONTRIBUTION_FORM,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  auth: {
    isLoggedIn: false,
    isEmailVerified: false,
    isKycVerified: false,
  },
  fa_enabled: false,
  fa_disabled: false,
  emailVerified: false,
  initialEmail: false,
  passwordReset: false,
  passwordResetInner: false,
  passwordResetSuccess: false,
  resetOuterError: false,
  depositSuccess: false,
  timer: '1800',
  contributionPage:{
    dollars: '',
    address: '',
  }
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['auth', 'isLoggedIn'], true);
    case USER_LOGGED_OUT:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['auth', 'isLoggedIn'], false)
        .setIn(['auth', 'isEmailVerified'], false)
        .setIn(['auth', 'isKycVerified'], false);
    case FA_ENABLED:
      return state
        .set('fa_enabled', action.data)
        .set('fa_disabled', false);
    case FA_DISABLED:
      return state
        .set('fa_disabled', action.data)
        .set('fa_enabled', false);
    case EMAIL_VERIFIED:
      return state
        .set('emailVerified', true)
        .set('initialEmail', action.data);
    case PASSWORD_RESET:
      return state
        .set('passwordReset', true);
    case PASSWORD_RESET_INNER:
      return state
        .set('passwordResetInner', action.data)
        .set('passwordResetSuccess', true);
    case REMOVE_ERROR_INNER:
      return state
        .set('passwordResetInner', false)
        .set('passwordResetSuccess', false);
    case REMOVE_GLOBAL_CLEAR:
      return state
        .set('initialEmail', false)
        .set('emailVerified', false)
        .set('resetOuterError', false);
    case RESET_OUTER_ERROR:
      return state
        .set('resetOuterError', true);
    case REMOVE_OUTER_ERROR:
      return state
        .set('resetOuterError', false);
    case DEPOSIT_SUCCESS:
      return state
        .set('depositSuccess', action.data);
    case PASSWORD_RESET_INNER_REMOVE:
      return state
        .set('passwordResetSuccess', false);
    case CONTRIBUTION_FORM:
      return state
        .setIn(['contributionPage', 'dollars'], action.data.dollars)
        .setIn(['contributionPage', 'address'], action.data.address);
    default:
      return state;
  }
}
export default appReducer;
