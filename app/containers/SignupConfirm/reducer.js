/*
 *
 * SignupConfirm reducer
 *
 */
import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, RESEND_ACTION, RESEND_SUCCESS, RESEND_FAILURE,
} from './constants';

const initialState = fromJS({
  resendMail: false,
  resendSuccess: false,
  resendFailure: false,
});

function signupConfirmReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case RESEND_ACTION:
      return state
        .set('resendMail', action.data);
    case RESEND_SUCCESS:
      return state
        .set('resendSuccess',action.data)
        .set('resendFailure', false);
    case RESEND_FAILURE:
      return state
        .set('resendSuccess', false)
        .set('resendFailure',action.data);
    default:
      return state;
  }
}

export default signupConfirmReducer;
