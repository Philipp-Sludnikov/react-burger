import { LOGOUT_USER, LOGOUT_USER_FAILED, LOGOUT_USER_SUCCESS, SET_LOGOUT, UNSET_LOGOUT } from "../actions/logout";
import { initialState, logoutReducer } from "./logout";

describe('logoutReducer', () => {
    it('Initial State', () => {
        expect(logoutReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('Logout User', () => {
        const action = {
            type: LOGOUT_USER
        }
        expect(logoutReducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: true
        })
    });

    it('Logout User Success', () => {
        const action = {
            type: LOGOUT_USER_SUCCESS
        }
        expect(logoutReducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: false
        })
    });

    it('Logout User Success', () => {
        const action = {
            type: LOGOUT_USER_FAILED,
            error: 'Logout Error'
        }
        expect(logoutReducer(initialState, action)).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutFailed: true,
            logoutError: action.error
        })
    });

    it('Set Logout', () => {
        const action = {
            type: SET_LOGOUT
        }
        expect(logoutReducer(initialState, action)).toEqual({
            ...initialState,
            logoutSuccess: true
        })
    });

    it('Unset Logout', () => {
        const action = {
            type: UNSET_LOGOUT
        }
        expect(logoutReducer(initialState, action)).toEqual({
            ...initialState,
            logoutSuccess: false
        })
    });
});

