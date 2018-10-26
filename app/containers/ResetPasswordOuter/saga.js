import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from 'utils/api';

import { makeSelectResetToken, makeSelectNewPassword } from './selectors';
import { RESET_PASSWORD } from './constants';
import { resetError, resetSuccess, removeReset } from './actions';
// Individual exports for testing

export function* reset() {
  // console.log("hearing to reset")

  try {
    const userToken = yield select(makeSelectResetToken());
    const userData = yield select(makeSelectNewPassword());
    // console.log(userToken)
    const body = {
      newPassword: userData,
    };
    // console.log(userData);
    const apiData = yield call(api.user.resetWithToken, userToken, body);
    if (apiData.success) {
      yield put(resetSuccess(apiData));
      yield put(push('/signin'));
    } else if (!apiData.success) {
      // console.log("errrorr")
      yield put(resetError(apiData));
      yield put(removeReset());
    }
    // console.log(apiData);
  } catch (err) {
    // console.log("api failed");
    // console.log(err)
  }
}
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(RESET_PASSWORD, reset);
}
