import api from 'utils/api';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { RESEND_ACTION } from './constants';

import { makeSelectResendMail } from './selectors';
import { resendSuccess, resendFailure } from './actions';

// Individual exports for testing
export function* resend() {
  try {
    const email = yield select(makeSelectResendMail());

    const apiData = yield call(api.user.resendMail, email);
    if (apiData.success) {
      yield put(resendSuccess(apiData.message));
    } else {
      yield put(resendFailure(apiData.message));
    }
  // console.log(apiData);
  } catch (error) {
  // console.log(error);
  }
}
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(RESEND_ACTION, resend);
}
