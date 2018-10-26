import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from 'utils/api';
import { passwordResetInner, passwordResetInnerRemove } from 'containers/App/actions';
import makeSelectResetPassword from './selectors';
import { RESET_PASSWORD } from './constants';
import { resetError } from './actions';


// Individual exports for testing

export function* reset() {
  // console.log("hearing to reset")

  try {
    const userData = yield select(makeSelectResetPassword());
    // console.log(userData)
    const oldPassword = userData.oldPassword;
    const newPassword = userData.newPassword;
    const user = {
      oldPassword,
      newPassword,
    };
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    // console.log(userData);
    const apiData = yield call(api.user.resetPassword, user, headers);
    // console.log(apiData);
    if (apiData.success) {
      yield put(passwordResetInner('Your password has been changed successfully'));
      // yield put(passwordResetInnerRemove());
      localStorage.removeItem('token');
      yield put(push('/signin'));
    } else {
      yield put(resetError('Your password cannot be updated'));
      yield put(passwordResetInnerRemove());
    }
    yield put(passwordResetInnerRemove());
  } catch (err) {
    // console.log("api failed");
    // console.log(err)
  }
}
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(RESET_PASSWORD, reset);
}
