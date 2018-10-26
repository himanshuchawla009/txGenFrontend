/*
 *
 * ResetPasswordOuter reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, RESET_PASSWORD, RESET_SUCCESS, RESET_ERROR, RESET_REMOVE,
} from './constants';


const initialState = fromJS({
  resetToken: false,
  newPassword: false,
  success: false,
  error: false,
  errorMessage: false,
  successMessage: false,
});

function resetPasswordOuterReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET_PASSWORD:
      return state
        .set('resetToken', action.data.token)
        .set('newPassword', action.data.newPassword);
    case RESET_SUCCESS:
      return state
        .set('success', action.data.success)
        .set('error', false)
        .set('successMessage', action.data.message);
    case RESET_ERROR:
      return state
        .set('error', true)
        .set('success', false)
        .set('errorMessage', action.data.message);
    case RESET_REMOVE:
      return state
        .set('error', false)
        .set('success', false)
        .set('errorMessage', false);

    default:
      return state;
  }
}

export default resetPasswordOuterReducer;
