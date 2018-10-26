
import { fromJS } from 'immutable';
import redirectPageReducer from '../reducer';

describe('redirectPageReducer', () => {
  it('returns the initial state', () => {
    expect(redirectPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
