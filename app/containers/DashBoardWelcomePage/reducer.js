/*
 *
 * DashBoardWelcomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  SUBMIT_SOCIAL,
  KYC_DONE,
  RESET_KYC_DONE
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  errorMessage: false,
  userInfo: {
    tokens: {
      total: 0,
      referral: 0,
      vote: 0,
    },
    referral: {
      code: 'YOUR CODE',
      success: 0,
      pending: 0,
    }
  },
  kycDone: false,
  ethAddress: ''
});

function dashBoardWelcomePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILE:
      return state
        .set('loading', true);
    case LOAD_PROFILE_SUCCESS:
      return state
        .set('loading', false)
        .set('userInfo', action.data);
    case DEFAULT_ACTION:
      return state;

    case SUBMIT_SOCIAL:
      return state
        .set('socialDetails', action.data);

    case KYC_DONE:
      return state
        .set('kycDone', true);

    case RESET_KYC_DONE:
      return state
        .set('kycDone', false);
    default:
      return state;
  }
}


export default dashBoardWelcomePageReducer;
