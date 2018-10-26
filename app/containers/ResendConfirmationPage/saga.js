import api from 'utils/api';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { RESEND_MAIL } from './constants';

import { makeSelectResendData } from './selectors';
import { resendError, resendSuccess } from './actions';

// Individual exports for testing
export function* resend() {
  try {
    const data = yield select(makeSelectResendData());
    console.log(data);
    const apiData = yield call(api.user.resendMail, data);
    if (apiData) {
      yield put(resendSuccess(apiData));
    }
  // console.log(apiData);
  } catch (error) {
    console.log(error);
  }
}
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(RESEND_MAIL, resend);
}
