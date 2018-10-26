import { createSelector } from 'reselect';

/**
 * Direct selector to the kycPage state domain
 */
const selectKycPageDomain = (state) => state.get('kycPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by KycPage
 */

const makeSelectKycPage = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.toJS()
);

const makeSelectKycDetails = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('kycDetails')
)

const makeSelectSubmitKycSuccess = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('submitKycSuccess')
)

const makeSelectKycDoc = () => createSelector(
  selectKycPageDomain,
  (substate) => substate.get('kycDoc')
)

export default makeSelectKycPage;
export {
  selectKycPageDomain,
  makeSelectKycDetails,
  makeSelectSubmitKycSuccess,
  makeSelectKycDoc,
};
