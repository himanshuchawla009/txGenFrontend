import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import api from 'utils/api';
import { SUBMIT_KYC, SUBMIT_KYC_DOC, GET_KYC_DETAILS } from './constants';
import { makeSelectKycDetails, makeSelectKycDoc } from './selectors';
import { submitKycSuccess, submitKycDocSuccess } from './actions';
import { push } from 'react-router-redux';

export function* submitKyc() {
  try {
    const headers = {
      headers: {
         'x-auth-token': localStorage.getItem('token'),
        },
    };
    
    const data = yield select(makeSelectKycDetails());
    const details = {
      fullName : data.fullName,
      dob : data.dob,
      gender : data.gender,
      phoneNumber : data.phone,
      ethAddress : data.ethAddress,
      citizenship : data.citizenship,
      country : data.country,
      state : data.state,
      city : data.city,
      address : data.address,
      address2 : data.address2,
      documentType : data.doc_type,
      documentNumber : data.doc_number
    }
    const apiData = yield call(api.user.updateKycDetails, headers, details);
    
    if(apiData){
      yield put(submitKycSuccess(apiData));
    }else{
      console.log(apiData);
    }

  }catch(err){
    console.log('error : ',err);
  }

}

export function* submitKycDoc() {
  try {
    const headers = {
      headers: {
         'x-auth-token': localStorage.getItem('token'),
         'content-type': 'multipart/form-data'
        },
    };
    
    const data = yield select(makeSelectKycDoc());
    console.log(data);
    const body = new FormData();

    body.append(data.field, data.image);
    
    const apiData = yield call(api.user.uploadKycDoc, headers, body);
    
    if(apiData.success){
      yield put(submitKycDocSuccess(apiData));
      console.log('from saga', apiData);
    }else{
      console.log(err);
    }
  }catch(err){
    console.log('error : ',err);
  }
}

export function* getKycDetails() {

}
// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(SUBMIT_KYC, submitKyc),
    takeEvery(SUBMIT_KYC_DOC, submitKycDoc)
  ];
}