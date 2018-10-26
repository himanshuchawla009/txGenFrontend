
import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import api from 'utils/api';
import { FORGOT_PASSWORD } from './constants';
import makeSelectForgotPassword from './selectors';
import { mailSent, mailError } from './actions';

// Individual exports for testing

export function* forgotPassword() {
  try {
    // console.log("listening forgot")
    const userData = yield select(makeSelectForgotPassword());
    const apiData = yield call(api.user.forgot, userData);
    // console.log(apiData);
    if (apiData.success) {
      yield put(mailSent(true));
      yield put(mailError(false));
    } else if (!apiData.success) {
      yield put(mailError(true));
      yield put(mailSent(false));
    }
  } catch (err) {
    // console.log("api failed");
    // console.log(err)
  }
}
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(FORGOT_PASSWORD, forgotPassword),
  ];
}
