
import { fromJS } from 'immutable';
import loadingReducer from '../reducer';

describe('loadingReducer', () => {
  it('returns the initial state', () => {
    expect(loadingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
