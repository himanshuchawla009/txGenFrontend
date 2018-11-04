
import { fromJS } from 'immutable';
import transferManagerReducer from '../reducer';

describe('transferManagerReducer', () => {
  it('returns the initial state', () => {
    expect(transferManagerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
