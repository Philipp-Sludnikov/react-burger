import { LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS } from "../actions/login";
import { initialState, loginReducer } from "./login";

describe('loginReducer', () => {
    it('Initial State', () => {
        expect(loginReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('Login User', () => {
        const action = {
            type: LOGIN_USER
        }
        expect(loginReducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: true
        })
    });

    it('Login User Success', () => {
        const action = {
            type: LOGIN_USER_SUCCESS
        }
        expect(loginReducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: false,
            loginSuccess: true
        })
    });

    it('Login User Failed', () => {
        const action = {
            type: LOGIN_USER_FAILED,
            error: 'Login Error'
        }
        expect(loginReducer(initialState, action)).toEqual({
            ...initialState,
            loginRequest: false,
            loginFailed: true,
            loginError: action.error
        })
    });
});

