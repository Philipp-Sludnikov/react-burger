import { GET_USER, GET_USER_FAILED, GET_USER_SUCCESS, SET_USER, UNSET_USER, UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from "../actions/user";
import { initialState, userReducer } from "./user";

describe('userReducer', () => {
    it('Initial State', () => {
        expect(userReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('Set User', () => {
        const action = {
            type: SET_USER,
            name: 'Philipp',
            email: 'feel2036@yandex.ru'
        }
        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            name: action.name,
            email: action.email
        })
    });

    it('Unset User', () => {
        const action = {
            type: UNSET_USER
        }
        expect(userReducer({...initialState, name: 'Philipp', email: 'feel2036@yandex.ru'}, action)).toEqual({
            ...initialState,
            name: '',
            email: '',
        })
    });

    it('Get User', () => {
        const action = {
            type: GET_USER
        }
        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            getUserRequest: true
        })
    });

    it('Get User Failed', () => {
        const action = {
            type: GET_USER_FAILED,
            error: 'Get User Error'
        }
        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            getUserRequest: false, 
            getUserFailed: true,
            getUserError: action.error
        })
    });

    it('Get User Success', () => {
        const action = {
            type: GET_USER_SUCCESS
        }
        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            getUserRequest: false
        })
    });

    it('Update User', () => {
        const action = {
            type: UPDATE_USER
        }
        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            updateUserRequest: true
        })
    });

    it('Update User Failed', () => {
        const action = {
            type: UPDATE_USER_FAILED,
            error: 'Update User Error'
        }
        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            updateUserRequest: false, 
            updateUserFailed: true,
            updateUserError: action.error
        })
    });

    it('Update User Success', () => {
        const action = {
            type: UPDATE_USER_SUCCESS
        }
        expect(userReducer(initialState, action)).toEqual({
            ...initialState,
            updateUserRequest: false
        })
    });
});

