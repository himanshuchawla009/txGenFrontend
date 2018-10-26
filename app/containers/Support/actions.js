/*
 *
 * Support actions
 *
 */

import {
  DEFAULT_ACTION, SUBMIT_SUPPORT,SUBMIT_SUPPORT_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function submitSupport(data) {
  return {
    type: SUBMIT_SUPPORT,
    data
  }
}

export function submitSupportSuccess(data) {
  return {
    type: SUBMIT_SUPPORT_SUCCESS,
    data
  }
}