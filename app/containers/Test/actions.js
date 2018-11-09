/*
 *
 * Test actions
 *
 */

import {
  DEFAULT_ACTION,
  BUY_REQUEST
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function buyRequest() {
  return {
    type: BUY_REQUEST,
  };
}
