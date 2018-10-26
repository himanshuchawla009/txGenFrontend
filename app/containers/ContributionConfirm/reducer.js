/*
 *
 * ContributionConfirm reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, SUCCESS_PAYMENT, REMOVE_PAYMENT_SUCCESS, REMOVE_PAYMENT_FAILURE, FAILURE_PAYMENT,
} from './constants';

const initialState = fromJS({
  paymentConfirm: false,
  paymentSuccess: false,
  paymentFailure: false,

});

function contributionConfirmReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SUCCESS_PAYMENT:
      return state
        .set('paymentSuccess', action.data)
        .set('paymentFailure', false);
    case FAILURE_PAYMENT:
      return state
        .set('paymentSuccess', false)
        .set('paymentFailure', action.data);
    case REMOVE_PAYMENT_SUCCESS:
      return state
        .set('paymentSuccess', false);

    case REMOVE_PAYMENT_FAILURE:
      return state
        .set('paymentFailure', false);
    default:
      return state;
  }
}

export default contributionConfirmReducer;
