import { createSelector } from 'reselect';

/**
 * Direct selector to the securityPage state domain
 */
const selectSecurityPageDomain = (state) => state.get('securityPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SecurityPage
 */

const makeSelectSecurityPage = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.toJS()
);
const makeSelectEnable = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.get('enable2fa')
);
const makeSelectDisable = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.get('disable2fa')
);
const makeSelectQr = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.get('qrCode')
);

const makeSelectVerify = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.get('otp')
);
const makeSelectVerified = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.get('verified')
);
const makeSelectResponse = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.get('response')
);

const makeSelectQrKey = () => createSelector(
  selectSecurityPageDomain,
  (substate) => substate.get('qrKey')
)

export default makeSelectSecurityPage;
export {
  selectSecurityPageDomain,
  makeSelectEnable,
  makeSelectDisable,
  makeSelectQr,
  makeSelectVerify,
  makeSelectVerified,
  makeSelectResponse,
  makeSelectQrKey
};
