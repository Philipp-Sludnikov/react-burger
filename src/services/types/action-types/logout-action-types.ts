import { LOGOUT_USER, UNSET_LOGOUT, SET_LOGOUT, LOGOUT_USER_FAILED, LOGOUT_USER_SUCCESS } from '../../actions/logout'; 

export type TLogoutUser = {
  type: typeof LOGOUT_USER;
}

export type TUnsetLogout = {
  type: typeof UNSET_LOGOUT;
  error?: string;
}

export type TSetLogout = {
  type: typeof SET_LOGOUT;
}

export type TLogoutUserFailed = {
  type: typeof LOGOUT_USER_FAILED;
  error: string;
}

export type TLogoutUserSuccess = {
  type: typeof LOGOUT_USER_SUCCESS;
}

export type TLogoutActions = TLogoutUser | TUnsetLogout | TSetLogout | TLogoutUserFailed | TLogoutUserSuccess;