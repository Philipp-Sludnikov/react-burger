import { REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS } from '../../actions/register'; 

export type TRegisterUser = {
  type: typeof REGISTER_USER;
}

export type TRegisterUserFailed = {
  type: typeof REGISTER_USER_FAILED;
  error: string;
}

export type TRegisterUserSuccess = {
  type: typeof REGISTER_USER_SUCCESS;
}


export type TRegisterActions = TRegisterUser | TRegisterUserFailed | TRegisterUserSuccess;