import { LOGOUT_USER, LOGOUT_USER_FAILED , LOGOUT_USER_SUCCESS } from '../actions/logout';

const initialState = {
    logoutRequest: false, 
    logoutFailed: false,
    logoutError: '',
};

export const logoutReducer = (state = initialState, action) => {
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
                logoutRequest: false,
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
        default:
            return state;
    }
}