import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  LOGIN_USER,
} from 'containers/LoginPage/constants';
import {
  userLoaded,
  userLoadingError,
  removeErrorMessage,

} from 'containers/LoginPage/actions';
import {
  makeSelectUser,
} from 'containers/LoginPage/selectors';
import { twoFactorEnabled, removeErrorGlobal } from 'containers/App/actions';
import api from 'utils/api';


export function* getUser() {
  // console.log("listening to api hit")
  try {
    // console.log("listening to api hit")

    const userData = yield select(makeSelectUser());
    // console.log(userData)
    const apiData = yield call(api.user.login, userData);

    if (apiData.success) {
      localStorage.setItem('token', apiData.authToken);
      yield put(userLoaded());
      yield put(twoFactorEnabled(apiData.is2FA_enabled));
      yield put(push('/dashboard'));
      yield put(removeErrorGlobal());
    } else if (!apiData.success) {
      yield put(userLoadingError(apiData.message));
      yield put(removeErrorMessage());
      yield put(removeErrorGlobal());
    }
  } catch (err) {
    // console.log("api failed");
    // console.log(err);
    // yield put(userLoadingError(err));
    yield put(removeErrorMessage());
  }
}
export default function* LoginData() {
  yield takeLatest(LOGIN_USER, getUser);
}
