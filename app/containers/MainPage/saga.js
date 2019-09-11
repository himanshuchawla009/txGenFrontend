

import { call, put, select, takeLatest } from "redux-saga/effects";
import {
   GET_TRANSACTIONS,SAVE_TRANSACTION,UPLOAD_IMAGE
  } from "./constants";



// import { } from './actions'
import api from "utils/api";
import  {
getTransactionResult,uploadImageResult,saveTransactionResult,clear

}  from "./actions";

import makeSelectMainPage from './selectors';


  export function* getTransactions() {
    try {
      
      const {filters} = yield select(makeSelectMainPage());
      console.log("in sage",filters)
     // console.log(data,"data in getTransaction Details")
      const apiData = yield call(api.transactions.getTransactions, filters.page,filters.limit);
      
      yield put(getTransactionResult(apiData));
      yield put(clear());

    } catch (err) {
       
      console.log(err);
    }
  }

  export function* uploadImage() {
    try {
      
      const { imageData } = yield select(makeSelectMainPage());
     // console.log(data,"data in getTransaction Details")
     const body = new FormData();

     body.append(imageData.type, imageData.file);
     let apiData;
       if(imageData.type === 'aws') {
          apiData = yield call(api.transactions.uploadToAws,body );
       } else {
          apiData = yield call(api.transactions.uploadToIpfs,body );

       }


       if (apiData.success) {
        const message = `${imageData.imageName} image uploaded successfully`;
        const result = {};
        result.success=true
        result.imageName = imageData.imageName;
        result.url = apiData.data;
        result.message= message
        yield put(uploadImageResult(result));
        yield put(clear());
      } else {
        const message = `Failed to upload ${imageData.imageName} image`;
        const result = {};
        result.type=imageData.type

        result.success=false
        result.message= message
        result.imageName = imageData.imageName;
        yield put(uploadImageResult(result));
        yield put(clear());
      }
      
      
      

    } catch (err) {
       
      console.log(err);
    }
  }

  export function* saveTransaction() {
    try {
      
      const { txData } = yield select(makeSelectMainPage());
     // console.log(data,"data in getTransaction Details")
     let apiData = yield call(api.transactions.generateTransaction,txData );

      
      yield put(saveTransactionResult(apiData));
      yield put(clear());

    } catch (err) {
       
      console.log(err);
    }
  }
 

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(GET_TRANSACTIONS, getTransactions),
    takeLatest(SAVE_TRANSACTION, saveTransaction),
    takeLatest(UPLOAD_IMAGE, uploadImage)




  ];
}
