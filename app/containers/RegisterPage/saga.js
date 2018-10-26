import { takeLatest, call, put, select } from 'redux-saga/effects';
import { makeSelectRegisterPage } from 'containers/RegisterPage/selectors';
import {
  REGISTER_USER,
} from 'containers/RegisterPage/constants';
import api from 'utils/api';
import {
  userRegistered, registerError, removeErrorMessage, removeSuccessMessage,
} from 'containers/RegisterPage/actions';

// Individual exports for testing
export function* register() {
  // console.log("hearing to signup")

  try {
    const userData = yield select(makeSelectRegisterPage());
    // console.log(userData)
    let apiData = yield call(api.user.signup, userData);
    // console.log('from saga', apiData);
    if (apiData.success) {
      yield put(userRegistered(apiData.message));
      yield put(removeSuccessMessage());
      yield put(removeErrorMessage());
    } else if (!apiData.success) {
      // console.log("error");
      yield put(registerError(apiData.message));
      yield put(removeErrorMessage());
      yield put(removeSuccessMessage());
    }


    // yield put(push('/auth/signin'));
  } catch (err) {
    // console.log("api failed");
    // console.log(err)


  }
}
export default function* registerUser() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REGISTER_USER, register);
}

