
import { fromJS } from 'immutable';
import contributionConfirmReducer from '../reducer';

describe('contributionConfirmReducer', () => {
  it('returns the initial state', () => {
    expect(contributionConfirmReducer(undefined, {})).toEqual(fromJS({}));
  });
});
