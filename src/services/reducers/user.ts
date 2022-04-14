import { SET_USER, UNSET_USER, 
    GET_USER, GET_USER_FAILED, GET_USER_SUCCESS,
    UPDATE_USER, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from '../actions/user';
import { TUserActions } from '../types/action-types/user-action-types';
import { TInitialState } from '../types/reducer-types/user-reducer-types';

const initialState: TInitialState = {
    name: '',
    email: '',
    getUserRequest: false, 
    getUserFailed: false,
    getUserError: '',
    updateUserRequest: false, 
    updateUserFailed: false,
    updateUserError: '',
};

export const userReducer = (state = initialState, action: TUserActions): TInitialState => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                name: action.name,
                email: action.email,
            }
        }
        case UNSET_USER: {
            return {
                ...state,
                name: '',
                email: '',
            }
        }
        case GET_USER: {
            return {
                ...state,
                getUserRequest: true
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest: false, 
                getUserFailed: true,
                getUserError: action.error,
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false
            }
        }
        case UPDATE_USER: {
            return {
                ...state,
                updateUserRequest: true
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false, 
                updateUserFailed: true,
                updateUserError: action.error,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false
            }
        }
        default:
            return state;
    }
}