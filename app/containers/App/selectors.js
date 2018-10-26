import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');
const selectGlobal = (state) => state.get('global');


const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);
const makeSelectGlobal = () => createSelector(
  selectGlobal,
  (routeState) => routeState.get('global').toJS()
);
const makeGlobalParent = () => createSelector(
  selectGlobal,
  (substate) => substate.toJS()
);

export {
  makeSelectLocation,
  makeSelectGlobal,
  makeGlobalParent,
};
