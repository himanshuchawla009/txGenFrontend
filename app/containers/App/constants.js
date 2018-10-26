/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const USER_LOGGED_IN = 'App/USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'App/USER_LOGGED_OUT';
export const FA_ENABLED = 'App/FA_ENABLED';
export const FA_DISABLED = 'App/FA_DISABLED';
export const EMAIL_VERIFIED = 'App/EMAIL_VERIFIED';
export const PASSWORD_RESET = 'App/PASSWORD_RESET';
export const PASSWORD_RESET_INNER = 'App/PASSWORD_RESET_INNER';
export const REMOVE_ERROR_INNER = 'App/PASSWORD_RESET_ERROR_INNER';
export const REMOVE_GLOBAL_CLEAR = 'App/REMOVE_GLOBAL_CLEAR';
export const EMAIL_GLOBAL_CLEAR = 'App/EMAIL_GLOBAL_CLEAR';
export const RESET_OUTER_ERROR = 'App/RESET_OUTER_ERROR';
export const DEPOSIT_SUCCESS = 'App/DEPOSIT_SUCCESS';
export const REMOVE_OUTER_ERROR = 'App/REMOVE_OUTER_ERROR';
export const REMOVE_SUCCESS = 'App/REMOVE_SUCCESS';
export const PASSWORD_RESET_INNER_REMOVE = 'App/PASSWORD_RESET_INNER_REMOVE';
export const UPDATE_TIMER = 'App/UPDATE_TIMER';
export const CONTRIBUTION_FORM = 'App/CONTRIBUTION_FORM';
// export const LOAD_REPOS_SUCCESS = 'App/LOAD_REPOS_SUCCESS';
// export const LOAD_REPOS_ERROR = 'App/LOAD_REPOS_ERROR';
export const DEFAULT_LOCALE = 'en';
