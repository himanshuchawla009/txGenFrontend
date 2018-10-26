/*
 *
 * SignupConfirm actions
 *
 */
import { DEFAULT_ACTION, RESEND_ACTION, RESEND_FAILURE, RESEND_SUCCESS} from './constants';
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function resendAction(data) {
  return {
    type: RESEND_ACTION,
    data,
  };
}
export function resendSuccess(data) {
  return {
    type: RESEND_SUCCESS,
    data,
  };
}
export function resendFailure(data) {
  return {
    type: RESEND_FAILURE,
    data,
  };
}
