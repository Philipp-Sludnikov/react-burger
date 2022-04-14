import { REGISTER_USER, REGISTER_USER_FAILED, REGISTER_USER_SUCCESS } from "../actions/register";
import { initialState, registerReducer } from "./register";

describe('registerReducer', () => {
    it('Initial State', () => {
        expect(registerReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('Register User', () => {
        const action = {
            type: REGISTER_USER
        }
        expect(registerReducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: true
        })
    });

    it('Register User Success', () => {
        const action = {
            type: REGISTER_USER_SUCCESS
        }
        expect(registerReducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: false
        })
    });

    it('Register User Failed', () => {
        const action = {
            type: REGISTER_USER_FAILED,
            error: 'Register Error'
        }
        expect(registerReducer(initialState, action)).toEqual({
            ...initialState,
            registerRequest: false,
            registerFailed: true,
            registerError: action.error
        })
    });
});

