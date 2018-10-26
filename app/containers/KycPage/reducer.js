/*
 *
 * KycPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUBMIT_KYC, SUBMIT_KYC_SUCCESS,RESET_SUCCESS,SUBMIT_KYC_DOC,SUBMIT_KYC_DOC_SUCCESS,GET_KYC_DETAILS
} from './constants';

const initialState = fromJS({});

function kycPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUBMIT_KYC:
      return state.set('kycDetails', action.data)
    case SUBMIT_KYC_SUCCESS:
      return state.set('submitKycSuccess', action.data)
    case RESET_SUCCESS:
      return state.set('submitKycSuccess', false)
    case SUBMIT_KYC_DOC:
      return state.set('kycDoc', action.data)
    case SUBMIT_KYC_DOC_SUCCESS:
      return state.set('kycDocSuccess', action.data)
    default:
      return state;
  }
}

export default kycPageReducer;
