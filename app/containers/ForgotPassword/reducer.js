/*
 *
 * ForgotPassword reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, FORGOT_PASSWORD, MAIL_SENT, MAIL_ERROR,
} from './constants';

const initialState = fromJS({
  data: {},
  mailSent: false,
  mailError: false,
});

function forgotPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FORGOT_PASSWORD:
      return state
        .set('data', action.data);
    case MAIL_SENT:
      return state
        .set('mailSent', action.data);
    case MAIL_ERROR:
      return state
        .set('mailError', action.data);

    default:
      return state;
  }
}

export default forgotPasswordReducer;
