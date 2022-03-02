import { SET_AUTH, UNSET_AUTH, REFRESH_TOKEN, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED } from '../actions/auth';


const initialState = {
    isAuth: false,
    accessToken: '',
    refreshToken: '',
    refreshTokenRequest: false,
    refreshTokenFailed: false,
    refreshTokenError: ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return {
                ...state,
                isAuth: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case UNSET_AUTH: {
            return {
                ...state,
                isAuth: false,
                accessToken: '',
                refreshToken: ''
            }
        }
        case REFRESH_TOKEN: {
            return {
                ...state,
                refreshTokenRequest: true
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false
            }
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: true,
                refreshTokenError: action.error
            }
        }
        default:
            return state;
    }
}