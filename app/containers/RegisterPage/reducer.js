/*
 *
 * RegisterPage reducer
 *
 */



import { fromJS } from 'immutable';
import {
  REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, REGISTER_USER_ERROR_MESSAGE_REMOVE, REMOVE_SUCCESS_MESSAGE,
} from './constants';
// The initial state of the App
const initialState = fromJS({
  user: {
    email: '',
    password: '',
    contributionRange: '',
    fullName: '',
    rfcode: '',
    termsAccepted: false,
    isUs: false,
    captcha: ''
  },
  registered: false,
  error: false,
  errorMessage: false,
  successMessage: false,
});

function registerPageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return state
        .set('user', action.data);
        // .setIn(['user', 'email'], action.data.email)
          // .setIn(['user', 'password'], action.data.password)
          // .setIn(['user', 'contributionRange'], action.data.contributionRange)
          // .setIn(['user', 'fullName'], action.data.fullName)
          // .setIn(['user', 'rfcode'], action.data.rfcode)
          // .setIn(['user', 'termsAccepted'],action.data.termsAccepted)
          // .setIn(['user', 'isUs'],action.data.isUs)
          // .setIn(['user', 'captcha',action.data.captcha]);
    case REGISTER_USER_SUCCESS:
      return state
        .set('registered', true)
        .set('successMessage', action.success)
        .set('error', false)
        .set('errorMessage', false);
    case REGISTER_USER_ERROR:
      return state
        .set('successMessage', action.success)
        .set('error', true)
        .set('errorMessage', action.error);
    case REGISTER_USER_ERROR_MESSAGE_REMOVE:
      return state
        .set('successMessage', action.success)
        .set('errorMessage', false)
        .set('error',true);
    case REMOVE_SUCCESS_MESSAGE:
      return state
        .set('successMessage', false)
        .set('success', true);
    default:
      return state;
  }
}

export default registerPageReducer;
