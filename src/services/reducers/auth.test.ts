import { SET_AUTH, UNSET_AUTH } from "../actions/auth";
import { authReducer, initialState } from "./auth"


describe('authReducer', () => {
    it('Initial State', () => {
        expect(authReducer(undefined, {} as any)).toEqual(initialState);
    });

    it ('Set Auth', () => {
        const action = {
            type: SET_AUTH
        }
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isAuth: true
        })
    });

    it ('Unset Auth', () => {
        const action = {
            type: UNSET_AUTH
        }
        expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isAuth: false
        })
    });
});

