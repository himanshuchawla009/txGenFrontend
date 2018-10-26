
import { fromJS } from 'immutable';
import securityPageReducer from '../reducer';

describe('securityPageReducer', () => {
  it('returns the initial state', () => {
    expect(securityPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
