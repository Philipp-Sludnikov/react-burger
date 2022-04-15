import { SET_RESTORE_PASS_STEP,  SET_RESET_PASS_STEP,
    FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED } from '../actions/restore-password';
import { TRestorePasswordActions } from '../types/action-types/restore-password-action-types';
import { TInitialState } from '../types/reducer-types/restore-password-reducer-types';

export const initialState: TInitialState = {
    restorePasswordStep: false,
    forgotPasswordRequest: false, 
    forgotPasswordFailed: false,
    forgotPasswordError: '',
    resetPasswordRequest: false, 
    resetPasswordFailed: false,
    resetPasswordError: ''
};

export const restorePasswordReducer = (state = initialState, action: TRestorePasswordActions): TInitialState => {
    switch (action.type) {
        case SET_RESTORE_PASS_STEP: {
            return {
                ...state,
                restorePasswordStep: true
            }
        }
        case SET_RESET_PASS_STEP: {
            return {
                ...state,
                restorePasswordStep: false
            }
        }
        case FORGOT_PASSWORD: {
            return {
                ...state,
                forgotPasswordRequest: true
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordRequest: false, 
                forgotPasswordFailed: true,
                forgotPasswordError: action.error,
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false
            }
        }
        case RESET_PASSWORD: {
            return {
                ...state,
                resetPasswordRequest: true
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false, 
                resetPasswordFailed: true,
                resetPasswordError: action.error,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false
            }
        }
        default:
            return state;
    }
}