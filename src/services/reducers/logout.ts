import { LOGOUT_USER, LOGOUT_USER_FAILED , LOGOUT_USER_SUCCESS, UNSET_LOGOUT, SET_LOGOUT } from '../actions/logout';
import { TLogoutActions } from '../types/action-types/logout-action-types';
import { TInitialState } from '../types/reducer-types/logout-reducer-types';

const initialState: TInitialState = {
    logoutRequest: false, 
    logoutFailed: false,
    logoutError: '',
    logoutSuccess: false
};

export const logoutReducer = (state = initialState, action: TLogoutActions): TInitialState => {
    switch (action.type) {
        case LOGOUT_USER: {
            return {
                ...state,
                logoutRequest: true
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                logoutRequest: false
            }
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
                logoutError: action.error
            }
        }
        case SET_LOGOUT: {
            return {
                ...state,
                logoutSuccess: true
            }
        }
        case UNSET_LOGOUT: {
            return {
                ...state,
                logoutSuccess: false
            }
        }
        default:
            return state;
    }
}