import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { UPDATE_DETAILS } from './constants';
import makeSelectProfilePage, { makeSelectDetails } from './selectors';
import { updateDetailsSuccess } from './actions';

export function* updateDetails(){
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }

    const data = yield select(makeSelectDetails());
    const apiData = yield call(api.user.updateProfile, headers, data);
    
    if(apiData.success){
      yield put(updateDetailsSuccess(apiData))
    }
  }catch(err){
    console.log(err)
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(UPDATE_DETAILS, updateDetails)
  ];
}
