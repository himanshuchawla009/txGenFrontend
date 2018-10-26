/*
 *
 * DashBoardWelcomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_PROFILE,
  LOAD_PROFILE_SUCCESS,
  SUBMIT_SOCIAL,
  KYC_DONE,
  RESET_KYC_DONE
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadProfileAction() {
  return {
    type: LOAD_PROFILE,
  };
}

export function profileLoaded(data) {
  return {
    type: LOAD_PROFILE_SUCCESS,
    data,
  };
}

export function submitSocial(data) {
  return {
    type: SUBMIT_SOCIAL,
    data
  };
}

export function kycDone () {
  return {
    type: KYC_DONE
  }
}

export function resetKycDone() {
  return {
    type: RESET_KYC_DONE
  }
}