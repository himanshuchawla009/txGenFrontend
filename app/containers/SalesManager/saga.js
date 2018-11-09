import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { BUY_REQUEST,SELL_REQUEST,GET_ALL_REQUESTS,GET_USER_REQUESTS } from './constants';
import { makeSelectCreateBuyRequest, makeSelectCreateSellRequest  } from './selectors';
import { buyRequestFail, buyRequestSuccess, sellRequestSuccess, sellRequestClear,sellRequestFail,clearBuyRequest, getAllRequests ,setBuyRequests,setSellRequests} from './actions';

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
      yield put(buyRequestSuccess());
      yield put(getAllRequests());
      yield put(clearBuyRequest());
    } else {
      yield put(buyRequestFail());
      yield put(clearBuyRequest());
    }
  }catch (err) {
    console.log(err);
    yield put(buyRequestFail());
    yield put(clearBuyRequest());
  }
}
export function* createSellRequest() {
  try {
    const headers = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    const data = yield select(makeSelectCreateSellRequest());
    const apiData = yield call(api.user.createSellRequest, headers, data);

    if (apiData.success) {
      console.log(apiData);
      yield put(sellRequestSuccess());
      yield put(getAllRequests());
      yield put(sellRequestClear());
    } else {
      yield put(sellRequestFail());
      yield put(sellRequestFail());
    }
  }catch (err) {
    console.log(err);
    yield put(sellRequestFail());
    yield put(sellRequestClear());
  }
}

export function* getTradeRequests() {
  try {
    const headers = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
 //   let page = yield select(makeSelectPage());
    const apiData = yield call(api.user.allTradeRequests, headers);
    if (apiData.success) {
      console.log(apiData);
    //  yield put(successGetRequests(apiData));
    } else {
    //  yield put(failGetRequests());
    }
  }catch (err) {
    console.log(err);
  }
}

export function* getBuyRequests() {
  try {
    const headers = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
 //   let page = yield select(makeSelectPage());
    const apiData = yield call(api.user.userBuyRequests, headers);
    if (apiData.success) {
      console.log(apiData);
     yield put(setBuyRequests(apiData.data));
    } else {
    //  yield put(failGetRequests());
    }
  }catch (err) {
    console.log(err);
  }
}

export function* getSellRequests() {
  try {
    const headers = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
 //   let page = yield select(makeSelectPage());
    const apiData = yield call(api.user.userSellRequests, headers);
    if (apiData.success) {
      console.log(apiData);
      yield put(setSellRequests(apiData.data));
    } else {
    //  yield put(failGetRequests());
    }
  }catch (err) {
    console.log(err);
  }
}



// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(BUY_REQUEST, createBuyRequest),
    takeLatest(SELL_REQUEST, createSellRequest),
    takeLatest(GET_ALL_REQUESTS, getTradeRequests),
    takeLatest(GET_ALL_REQUESTS, getBuyRequests),
    takeLatest(GET_ALL_REQUESTS, getSellRequests),
  ];
}
