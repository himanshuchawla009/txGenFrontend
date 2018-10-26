import {
  fromJS,
} from 'immutable';

import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_ERROR_MESSAGE_REMOVE,
  EMAIL_VERIFIED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  errorMessage: false,
  user: {
    email: '',
    password: '',
    rememberMe: false,
    otpToken: '',
    captcha: ''
  },
  emailVerified: false,
  initialEmail: false,
});


function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['user', 'email'], action.data.email)
        .setIn(['user', 'password'], action.data.password)
        .setIn(['user', 'rememberMe'], action.data.rememberMe)
        .setIn(['user', 'otpToken'], action.data.otpToken)
        .setIn(['user', 'captcha'], action.data.captcha);
    case LOGIN_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('errorMessage', false);

    case LOGIN_USER_ERROR:
      if (action.error) {
        return state
          .set('error', true)
          .set('errorMessage', action.error)
          .set('loading', false);
      }
      return state
        .set('error', true)
        .set('loading', false);

    case LOGIN_USER_ERROR_MESSAGE_REMOVE:
      return state
        .set('errorMessage', false)
        .set('error', false);
    case EMAIL_VERIFIED:
      return state
        .set('emailVerified', true)
        .set('initialEmail', action.data);
    default:
      return state;
  }
}

export default loginReducer;
