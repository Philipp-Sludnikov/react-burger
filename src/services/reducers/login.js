import { LOGIN_USER, LOGIN_USER_FAILED , LOGIN_USER_SUCCESS } from '../actions/login';

const initialState = {
    loginSuccess: false,
    loginRequest: false, 
    loginFailed: false,
    loginError: '',
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER: {
            return {
                ...state,
                loginRequest: true
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginSuccess: true
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true,
                loginError: action.error
            }
        }
        default:
            return state;
    }
}