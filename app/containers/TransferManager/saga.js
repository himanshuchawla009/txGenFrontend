import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { CREATE_REQUEST, GET_REQUEST } from './constants';
import { makeSelectCreateRequest } from './selectors';
import { successGetRequests, successRequest, failGetRequests, failRequest, clearState,getRequests } from './actions';

export function* createRequest() {
  try {
    const headers = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const data = yield select(makeSelectCreateRequest());
    const apiData = yield call(api.user.createRequest, headers, data);

    if (apiData.success) {
      console.log(apiData);
      yield put(successRequest());
      yield put(getRequests());
      yield put(clearState());
    } else {
      yield put(failRequest());
      yield put(clearState());
    }
  }catch (err) {
    console.log(err);
    yield put(failRequest());
    yield put(clearState());
  }
}

export function* getAllRequests() {
  try {
    const headers = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const apiData = yield call(api.user.getRequests, headers);
    if (apiData.success) {
      console.log(apiData);
      yield put(successGetRequests(apiData.data));
      yield put(clearState());
    } else {
      yield put(failGetRequests());
      yield put(clearState());
    }
  }catch (err) {
    console.log(err);
    yield put(failGetRequests());
    yield put(clearState());
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(CREATE_REQUEST, createRequest),
    takeLatest(GET_REQUEST, getAllRequests),
  ];
}
