
import { fromJS } from 'immutable';
import dashBoardWelcomePageReducer from '../reducer';

describe('dashBoardWelcomePageReducer', () => {
  it('returns the initial state', () => {
    expect(dashBoardWelcomePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
