
import { fromJS } from 'immutable';
import kycPageReducer from '../reducer';

describe('kycPageReducer', () => {
  it('returns the initial state', () => {
    expect(kycPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
