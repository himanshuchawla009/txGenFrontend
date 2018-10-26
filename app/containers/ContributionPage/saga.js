import api from 'utils/api';
import { push } from 'react-router-redux';
import { depositSuccess } from 'containers/App/actions';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_DATA, CONFIRM_PAYMENT, RELOAD_PAGE, SEND_PAYMENT } from './constants';
import { successData, successPayment, successFinalizePayment } from './actions';
import { makeSelectContributionConfirm, makeSelectFinalTransaction } from './selectors';

export function* getData() {
  try {
   // console.log('listening');
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const apiData = yield call(api.user.getContributionData, headers);
   // console.log(apiData);
    if (apiData.success) {
      console.log(apiData);
      yield put(successData(apiData.data));
    }
  } catch (error) {
   // console.log(error);
  }
}
export function* contribute() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const body = yield select(makeSelectContributionConfirm());
    const apiData = yield call(api.user.deposit, headers, body);
    if (apiData.success) {
      yield put(depositSuccess(true));
      yield put(successPayment(apiData));
    }
  } catch (error) {
    
 }
}
export function* finalPayment() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const body = yield select(makeSelectFinalTransaction());
    console.log(body)
    const apiData = yield call(api.user.depositWithHash, headers, body);
    if (apiData.success) {
      yield put(successFinalizePayment(true));
      yield put(push('/dashboard/transactionHistory'));
      yield put(successPayment(apiData));
    }
  } catch (error) {
    
 }
}
export function* reloadMe() {
  yield put(push('/dashboard'));
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js

  yield [takeLatest(GET_DATA, getData),
    takeLatest(CONFIRM_PAYMENT, contribute),
    takeLatest(RELOAD_PAGE, reloadMe),
    takeLatest(SEND_PAYMENT, finalPayment),
  ];
}

