import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, 
  RESET_PASSWORD, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS,
  SET_RESTORE_PASS_STEP, SET_RESET_PASS_STEP } from '../../actions/restore-password'; 

export type TForgotPassword = {
  type: typeof FORGOT_PASSWORD;
}

export type TForgotPasswordFailed = {
  type: typeof FORGOT_PASSWORD_FAILED;
  error: string;
}

export type TForgotPasswordSuccess = {
  type: typeof FORGOT_PASSWORD_SUCCESS;
}

export type TResetPassword = {
  type: typeof RESET_PASSWORD;
}

export type TResetPasswordFailed = {
  type: typeof RESET_PASSWORD_FAILED;
  error: string;
}

export type TResetPasswordSuccess = {
  type: typeof RESET_PASSWORD_SUCCESS;
}

export type TSetRestorePassStep = {
  type: typeof SET_RESTORE_PASS_STEP;
}

export type TSetResetPassStep = {
  type: typeof SET_RESET_PASS_STEP;
}

export type TRestorePasswordActions = TForgotPassword | TForgotPasswordFailed | TForgotPasswordSuccess | TResetPassword | TResetPasswordFailed | TResetPasswordSuccess | TSetRestorePassStep | TSetResetPassStep;