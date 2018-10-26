import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { SUBMIT_SUPPORT } from './constants';
import { makeSelectSupportData, makeSelectSupportSuccess } from './selectors';
import { submitSupportSuccess } from './actions';

export function* submitSupport(){
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }

    const data = yield select(makeSelectSupportData());
    const apiData = yield call(api.user.support, headers, data);
    
    if(apiData){
      yield put(submitSupportSuccess(apiData));
    }
  }catch(err){
    console.log(err)
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(SUBMIT_SUPPORT, submitSupport)
  ];
}
