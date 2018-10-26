/*
 *
 * ResetPassword reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, RESET_PASSWORD, RESET_ERROR, RESET_SUCCESS,
} from './constants';


const initialState = fromJS({

  oldPassword: false,
  newPassword: false,
  resetError: false,
  resetSuccess: false,


});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESET_PASSWORD:
      return state
        .set('oldPassword', action.data.oldPassword)
        .set('newPassword', action.data.newPassword);
    case RESET_ERROR:
      return state
        .set('resetError', action.data)
        .set('resetSuccess', false);
    case RESET_SUCCESS:
      return state
        .set('resetSuccess', action.data)
        .set('resetError', false);
    default:
      return state;
  }
}

export default resetPasswordReducer;
