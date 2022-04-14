import { LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS } from '../../actions/login'; 

export type TLoginUser = {
  type: typeof LOGIN_USER;
}

export type TLoginUserFailed = {
  type: typeof LOGIN_USER_FAILED;
  error: string;
}

export type TLoginUserSuccess = {
  type: typeof LOGIN_USER_SUCCESS;
}

export type TLoginActions = TLoginUser | TLoginUserFailed | TLoginUserSuccess;