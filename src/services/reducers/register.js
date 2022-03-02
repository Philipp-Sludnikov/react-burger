import { REGISTER_USER, REGISTER_USER_FAILED , REGISTER_USER_SUCCESS } from '../actions/register';

const initialState = {
    registerRequest: false, 
    registerFailed: false,
    registerError: '',
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER: {
            return {
                ...state,
                registerRequest: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true,
                registerError: action.error
            }
        }
        default:
            return state;
    }
}