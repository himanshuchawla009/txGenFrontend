import { createSelector } from 'reselect';

/**
 * Direct selector to the transferManager state domain
 */
const selectTransferManagerDomain = (state) => state.get('transferManager');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TransferManager
 */


const makeSelectTransferManager = () => createSelector(
  selectTransferManagerDomain,
  (substate) => substate.toJS()
);


const makeSelectCreateRequest = () => createSelector(
  selectTransferManagerDomain,
  (substate) => substate.get('requestData')
);
const makeSelectAllRequests = () => createSelector(
  selectTransferManagerDomain,
  (substate) => substate.get('allRequests')
);

const makeSelectNextPage = () => createSelector(
  selectTransferManagerDomain,
  (substate) => substate.get('nextPage')
);

const makeSelectPage = () => createSelector(
  selectTransferManagerDomain,
  (substate) => substate.get('page')
);


export default makeSelectTransferManager;
export {
  selectTransferManagerDomain,
  makeSelectCreateRequest,
  makeSelectAllRequests,
  makeSelectNextPage,
  makeSelectPage
};
