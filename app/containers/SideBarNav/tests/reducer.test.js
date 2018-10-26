
import { fromJS } from 'immutable';
import sideBarNavReducer from '../reducer';

describe('sideBarNavReducer', () => {
  it('returns the initial state', () => {
    expect(sideBarNavReducer(undefined, {})).toEqual(fromJS({}));
  });
});
