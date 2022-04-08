import { LOGIN_USER, LOGIN_USER_FAILED , LOGIN_USER_SUCCESS } from '../actions/login';
import { TLoginActions } from '../types/action-types/login-action-types';
import { TInitialState } from '../types/reducer-types/login-reducer-types';

const initialState: TInitialState = {
    loginSuccess: false,
    loginRequest: false, 
    loginFailed: false,
    loginError: '',
};

export const loginReducer = (state = initialState, action: TLoginActions): TInitialState => {
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