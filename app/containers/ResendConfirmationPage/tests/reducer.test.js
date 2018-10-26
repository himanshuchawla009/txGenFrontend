
import { fromJS } from 'immutable';
import resendConfirmationPageReducer from '../reducer';

describe('resendConfirmationPageReducer', () => {
  it('returns the initial state', () => {
    expect(resendConfirmationPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
