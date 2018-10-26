import { createSelector } from 'reselect';

/**
 * Direct selector to the support state domain
 */
const selectSupportDomain = (state) => state.get('support');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Support
 */

const makeSelectSupport = () => createSelector(
  selectSupportDomain,
  (substate) => substate.toJS()
);

const makeSelectSupportData = () => createSelector(
  selectSupportDomain,
  (substate) => substate.get('supportData')
);

const makeSelectSupportSuccess = () => createSelector(
  selectSupportDomain,
  (substate) => substate.get('supportSuccess')
)

export default makeSelectSupport;
export {
  makeSelectSupportSuccess,
  makeSelectSupportData,
  selectSupportDomain,
};
