import { call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'utils/api';
import { CREATE_TICKET, GET_TICKETS, SEND_MESSAGE, GET_MESSAGES } from './constants';
import { makeSelectCreateTicket, makeSelectMessage, makeSelectTicketId } from './selectors';
import { createTicketSuccess, ticketSuccess, messageSuccess, getMessagesSuccess } from './actions';

export function* createTicket(){
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }

    const data = yield select(makeSelectCreateTicket());
    const apiData = yield call(api.user.createTicket, headers, data);
    
    if(apiData){
      console.log(apiData);
      yield put(createTicketSuccess(apiData));
    }
  }catch(err){
    console.log(err)
  }
}

export function* getTickets() {
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }
    const apiData = yield call(api.user.getTickets, headers);
    if(apiData){
      yield put(ticketSuccess(apiData));
    }
  }catch(err){
    console.log(err)
  }
}

export function* sendMessage() {
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }

    const message = yield select(makeSelectMessage());
    const ticketId = yield select(makeSelectTicketId());
    const apiData = yield call(api.user.sendMessage, headers, ticketId, {message});
    if(apiData){
      yield put(messageSuccess(apiData));
    }

  }catch(err){
    console.log(err)
  }
}

export function* getMessages() {
  try{
    const headers = {
      headers : {
        'x-auth-token' : localStorage.getItem('token'),
      },
    }

    const ticketId = yield select(makeSelectTicketId());
    const apiData = yield call(api.user.getMessages, headers, ticketId);
    if(apiData){
      console.log('api data', apiData);
      yield put(getMessagesSuccess(apiData));
    }

  }catch(err){
    console.log(err)
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield [
    takeLatest(CREATE_TICKET, createTicket),
    takeLatest(GET_TICKETS, getTickets),
    takeLatest(SEND_MESSAGE, sendMessage),
    takeLatest(GET_MESSAGES, getMessages)
  ];
}
