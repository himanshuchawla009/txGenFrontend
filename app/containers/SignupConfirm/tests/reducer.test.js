
import { fromJS } from 'immutable';
import signupConfirmReducer from '../reducer';

describe('signupConfirmReducer', () => {
  it('returns the initial state', () => {
    expect(signupConfirmReducer(undefined, {})).toEqual(fromJS({}));
  });
});
