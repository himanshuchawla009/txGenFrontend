import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { BUY_REQUEST } from './constants';
// import { makeSelectCreateBuyRequest, makeSelectCreateSellRequest  } from './selectors';
// import { buyRequestFail, buyRequestSuccess, sellRequestSuccess, sellRequestClear,sellRequestFail,clearBuyRequest } from './actions';

export function* createBuyRequest() {
  console.log("saaga buy reques");
  try {
    const headers = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const data = yield select(makeSelectCreateBuyRequest());
    const apiData = yield call(api.user.createBuyRequest, headers, data);

    if (apiData.success) {
      console.log(apiData);
      // yield put(buyRequestSuccess());
      // yield put(getAllRequests());
      // yield put(clearBuyRequest());
    } else {
      // yield put(buyRequestFail());
      // yield put(clearBuyRequest());
    }
  }catch (err) {
    console.log(err);
    // yield put(buyRequestFail());
    // yield put(clearBuyRequest());
  }
}



// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(BUY_REQUEST, createBuyRequest)
  ];
}
