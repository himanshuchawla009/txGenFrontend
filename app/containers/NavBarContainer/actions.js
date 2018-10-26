/*
 *
 * NavBarContainer actions
 *
 */

import {
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function signOut() {
  // console.log("sign out action called");
  return {
    type: 'SIGN_OUT',
  };
}
