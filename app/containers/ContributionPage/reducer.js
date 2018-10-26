/*
 *
 * ContributionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SELECT_ACTION,
  GET_DATA,
  SUCCESS_DATA,
  FAILURE_DATA,
  CONFIRM_PAYMENT,
  SUCCESS_PAYMENT,
  FAILURE_PAYMENT, REMOVE_PAYMENT_FAILURE, REMOVE_PAYMENT_SUCCESS, SEND_PAYMENT, SUCCESS_SEND_PAYMENT,
} from './constants';

const initialState = fromJS({
  currency: 'ethereum',
  getData: false,
  success: {
    tokenUsd: false,
    ethUsd: false,
    btcUsd: false,
    ethAddress: false,
    btcAddress: false,
    bonus: false,
    stage: false,
    minInvest: false,

  },
  failure: false,
  paymentConfirm: {
    tokens: false,
    type: false,
    amount: false,
    fromAddress: false,
    toAddress: false,
    tokenReceivingAddress: false,
    usdAmount: false,
    // transactionHash: false,
  },
  paymentSuccess: false,
  paymentFailure: false,
  paymentId: false,
  paymentSentSuccess: false,
  finalConfirm:{
    transactionId: false,
    transactionHash: false,
  },
  
});

function contributionPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SELECT_ACTION:
      return state
        .set('currency', action.data);
    case GET_DATA:
      return state
        .set('getData', true);
    case CONFIRM_PAYMENT:
      return state
        .setIn(['paymentConfirm', 'tokens'], action.data.tokens)
        .setIn(['paymentConfirm', 'type'], action.data.type)
        .setIn(['paymentConfirm', 'amount'], action.data.amount)
        .setIn(['paymentConfirm', 'fromAddress'], action.data.fromAddress)
        .setIn(['paymentConfirm', 'toAddress'], action.data.toAddress)
        .setIn(['paymentConfirm', 'tokenReceivingAddress'], action.data.tokenReceivingAddress)
        .setIn(['paymentConfirm', 'usdAmount'], action.data.usdAmount);
      // .setIn(['paymentConfirm', 'transactionHash'], action.data.transactionHash);
    case SUCCESS_DATA:
      return state
        .setIn(['success', 'tokenUsd'], action.data.tokenUsd)
        .setIn(['success', 'ethUsd'], action.data.ethUsd)
        .setIn(['success', 'btcUsd'], action.data.btcUsd)
        .setIn(['success', 'eurUsd'], action.data.eurUsd)
        .setIn(['success', 'ethAddress'], action.data.ethAddress)
        .setIn(['success', 'btcAddress'], action.data.btcAddress)
        .setIn(['success', 'bonus'], action.data.bonus)
        .setIn(['success', 'stage'], action.data.stage)
        .setIn(['success', 'minInvest'], action.data.minInvest)
        .setIn(['success', 'privateSaleTokenUsd'], action.data.privateSaleTokenUsd)
        .setIn(['success', 'discountSaleTokenUsd'], action.data.discountSaleTokenUsd)
        .setIn(['success', 'mainSaleTokenUsd'], action.data.mainSaleTokenUsd)
        .set('failure', false);
    case SUCCESS_PAYMENT:
      return state
        .set('paymentSuccess', action.data.success)
        .set('paymentId', action.data.transactionId)
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
    case FAILURE_DATA:
      return state
        .set('failure', true);
    case SEND_PAYMENT:
      return state
        .setIn(['finalConfirm', 'transactionId'], action.data.transactionId)
        .setIn(['finalConfirm', 'transactionHash'], action.data.transactionHash);

    case SUCCESS_SEND_PAYMENT:
      return state
        .set('paymentSentSuccess', action.data);
    default:
      return state;
  }
}

export default contributionPageReducer;
