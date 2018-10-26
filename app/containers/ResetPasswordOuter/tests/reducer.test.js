
import { fromJS } from 'immutable';
import resetPasswordOuterReducer from '../reducer';

describe('resetPasswordOuterReducer', () => {
  it('returns the initial state', () => {
    expect(resetPasswordOuterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
