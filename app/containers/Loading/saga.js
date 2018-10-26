import { call, put, select, takeLatest  } from 'redux-saga/effects';
import api from 'utils/api';
import { push } from 'react-router-redux';
import { VERIFY_TOKEN } from './constants';
import { emailVerified, emailGlobalClear, resetOuterError, removeOuterError } from 'containers/App/actions';

// Individual exports for testing
import { makeSelectToken } from './selectors';
export function* verifyUser() {
  try {
    // console.log("verifying user");
    const token = yield select(makeSelectToken());
    // console.log(token)
    let apiData = yield call(api.user.validateToken, token);

    // console.log(apiData);
    if (apiData.data.success) {
      yield put(emailVerified(apiData.data.email));
      yield put(emailGlobalClear());
      yield put(removeOuterError());
      yield put(push('/signin'));
    } else if (!apiData.data.success) {
      yield put(removeOuterError());
      yield put(resetOuterError());


      yield put(push('/signin'));
    }
  } catch(err) {
    // console.log( "loading error" + err)
  }
}
export default function* defaultSaga() {
  yield [
    takeLatest(VERIFY_TOKEN, verifyUser),
  ];
}

