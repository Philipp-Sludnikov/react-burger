import { FORGOT_PASSWORD, FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, SET_RESET_PASS_STEP, SET_RESTORE_PASS_STEP } from "../actions/restore-password";
import { initialState, restorePasswordReducer } from "./restore-password";

describe('restorePasswordReducer', () => {
    it('Initial State', () => {
        expect(restorePasswordReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('Set Restore Password Step', () => {
        const action = {
            type: SET_RESTORE_PASS_STEP
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            restorePasswordStep: true
        })
    });

    it('Set Reset Password Step', () => {
        const action = {
            type: SET_RESET_PASS_STEP
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            restorePasswordStep: false
        })
    });

    it('Forgot Password', () => {
        const action = {
            type: FORGOT_PASSWORD
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: true
        })
    });

    it('Forgot Password Failed', () => {
        const action = {
            type: FORGOT_PASSWORD_FAILED,
            error: 'Forgot Password Error'
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: false, 
            forgotPasswordFailed: true,
            forgotPasswordError: action.error
        })
    });

    it('Forgot Password Success', () => {
        const action = {
            type: FORGOT_PASSWORD_SUCCESS
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            forgotPasswordRequest: false
        })
    });

    it('Reset Password', () => {
        const action = {
            type: RESET_PASSWORD
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: true
        })
    });

    it('Reset Password Failed', () => {
        const action = {
            type: RESET_PASSWORD_FAILED,
            error: 'Reset Password Error'
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: false, 
            resetPasswordFailed: true,
            resetPasswordError: action.error
        })
    });

    it('Reset Password Success', () => {
        const action = {
            type: RESET_PASSWORD_SUCCESS
        }
        expect(restorePasswordReducer(initialState, action)).toEqual({
            ...initialState,
            resetPasswordRequest: false
        })
    });
});

