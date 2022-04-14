import { SET_USER, UNSET_USER, 
GET_USER, GET_USER_FAILED, GET_USER_SUCCESS, 
UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from '../../actions/user'; 

export type TSetUser = {
  type: typeof SET_USER;
  name: string;
  email: string;
}

export type TUnsetUser = {
  type: typeof UNSET_USER;
}

export type TGetUser = {
  type: typeof GET_USER;
}

export type TGetUserFailed = {
  type: typeof GET_USER_FAILED;
  error: string;
}

export type TGetUserSuccess = {
  type: typeof GET_USER_SUCCESS;
}

export type TUpdateUser = {
  type: typeof UPDATE_USER;
}

export type TUpdateUserFailed = {
  type: typeof UPDATE_USER_FAILED;
  error: string;
}

export type TUpdateUserSuccess = {
  type: typeof UPDATE_USER_SUCCESS;
}

export type TUserActions = TSetUser | TUnsetUser | TGetUser | TGetUserFailed | TGetUserSuccess | TUpdateUser | TUpdateUserFailed | TUpdateUserSuccess;