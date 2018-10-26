/*
 *
 * SecurityPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, ENABLE_2FA, DISABLE_2FA, SUCCESS_2FA,VERIFY_2FA, RESPONSE_2FA,REMOVE_RESPONSE
} from './constants';

const initialState = fromJS({
  enable2fa: false,
  disable2fa: false,
  qrCode:'',
  otp:'',
  verified:false,
  errorMessage:false,
  error:false,
});

function securityPageReducer(state = initialState, action) {
  switch (action.type) {
    case ENABLE_2FA:
      return state
       .set('enable2fa',true)
       .set('disable2fa',false);
    case DISABLE_2FA:
       return state
       .set('disable2fa',true)
       .set('enable2fa',false);
    case SUCCESS_2FA:
      return state
        .set('qrCode',action.data.qrCode)
        .set('qrKey',action.data.qrKey);
    case VERIFY_2FA:
      return state
       .set('otp',action.data)
       .set('verified',true)
       .set('enable2fa',true)
       .set('disable2fa',false);
    case RESPONSE_2FA:
    return state
    .set('response',action.data);
   
   case REMOVE_RESPONSE:
      return state
       .set('response',false);
      
    default:
      return state;
  }
}

export default securityPageReducer;
