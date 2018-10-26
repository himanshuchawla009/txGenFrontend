import { createSelector } from 'reselect';

/**
 * Direct selector to the sideBarNav state domain
 */
const selectSideBarNavDomain = (state) => state.get('sideBarNav');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SideBarNav
 */

const makeSelectSideBarNav = () => createSelector(
  selectSideBarNavDomain,
  (substate) => substate.toJS()
);

export default makeSelectSideBarNav;
export {
  selectSideBarNavDomain,
};
