import { createSelector } from 'reselect';

/**
 * Direct selector to the salesManager state domain
 */
const selectSalesManagerDomain = (state) => state.get('salesManager');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SalesManager
 */

const makeSelectSalesManager = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.toJS()
);
const makeSelectCreateSellRequest = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('sellData')
);
const makeSelectCreateBuyRequest = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('buyData')
);

const makeSelectBuyRequests = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('buyRequests')
);

const makeSelectSellRequests = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('sellRequests')
);

const makeSelectBuySuccess = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('buySuccess')
);
const makeSelectSellSuccess = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('sellSuccess')
);
const makeSelectBuyFail = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('buyFail')
);
const makeSelectSellFail = () => createSelector(
  selectSalesManagerDomain,
  (substate) => substate.get('sellFail')
);
export default makeSelectSalesManager;
export {
  selectSalesManagerDomain,
  makeSelectCreateBuyRequest,
  makeSelectCreateSellRequest,
  makeSelectBuyRequests,
  makeSelectSellRequests,
  makeSelectBuyFail,
  makeSelectBuySuccess,
  makeSelectSellFail,
  makeSelectSellSuccess,
};
