
import { fromJS } from 'immutable';
import contributionPageReducer from '../reducer';

describe('contributionPageReducer', () => {
  it('returns the initial state', () => {
    expect(contributionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
