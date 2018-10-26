
import { fromJS } from 'immutable';
import transactionHistoryReducer from '../reducer';

describe('transactionHistoryReducer', () => {
  it('returns the initial state', () => {
    expect(transactionHistoryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
