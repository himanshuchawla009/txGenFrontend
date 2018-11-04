import { createSelector } from 'reselect';

/**
 * Direct selector to the dashBoardWelcomePage state domain
 */
const selectDashBoardWelcomePageDomain = (state) => state.get('dashBoardWelcomePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DashBoardWelcomePage
 */

const makeSelectDashBoardWelcomePage = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.toJS()
);

const makeSelectSocial = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('socialDetails')
);

const makeSelectKycDone = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('kycDone')
);

const makeSelectEthAddress = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('ethAddress')
);
const makeSelectUserInfo = () => createSelector(
  selectDashBoardWelcomePageDomain,
  (substate) => substate.get('userInfo')
);

export default makeSelectDashBoardWelcomePage;
export {
  selectDashBoardWelcomePageDomain,
  makeSelectSocial,
  makeSelectKycDone,
  makeSelectEthAddress,
  makeSelectUserInfo,
};
