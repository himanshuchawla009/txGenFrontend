import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { successTransactions } from './actions';
import { makeSelectPage } from './selectors';
import { GET_TRANSACTIONS } from './constants';
export function* getTransaction() {
  try {
    const headers = {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    };
    const page = yield select(makeSelectPage());
    const apiData = yield call(api.user.fetchUserTransactions, headers, page);
    if (apiData.success) {
      yield put(successTransactions(apiData));
    }
  } catch (error) {
    // console.log('heelooo', error);
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_TRANSACTIONS, getTransaction);
}
