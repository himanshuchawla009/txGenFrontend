/*
 *
 * MainPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION,SAVE_TRANSACTION,SAVE_TRANSACTION_RESULT,GET_TRANSACTIONS,GET_TRANSACTIONS_RESULT,CLEAR,UPLOAD_IMAGE,UPLOAD_IMAGE_RESULT } from './constants';

const initialState = fromJS({
  txData:{},
    txResult:false,
    transactions:false,
    filters:{
      page:1,
      limit:50
    },
    imageData:false,
    imageResult:false
});

function mainPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case SAVE_TRANSACTION:
        return state.set('txData',action.data)
      case SAVE_TRANSACTION_RESULT:
        return state.set('txResult',action.data)
      case GET_TRANSACTIONS:
        return state.set('filters',action.data)
      case GET_TRANSACTIONS_RESULT:
        return state.set('transactions',action.data)
      case UPLOAD_IMAGE:
        return state.set('imageData',action.data)
      case UPLOAD_IMAGE_RESULT:
        return state.set('imageResult',action.data)
        case CLEAR:
          return state.set('imageResult',false)
                 .set('txResult',false)
                 .set('transactions',false)
    default:
      return state;
  }
}

export default mainPageReducer;
