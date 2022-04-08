import { SET_USER } from './user';
import { SET_AUTH } from './auth';
import { checkResponse } from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { UNSET_LOGOUT } from './logout';
import { API_URL } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types/types';

export const LOGIN_USER: 'LOGIN_USER' = 'LOGIN_USER';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';

export const loginUser: AppThunk = (email: string, password: string) => {
    const loginInfo = {
        email: email,
        password: password,
    };
    return (dispatch: AppDispatch) => {
        dispatch({ type: LOGIN_USER });

        fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(loginInfo)
        })
        .then(checkResponse)
        .then(data => {
            
            if(data.success) {
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
                dispatch({type: LOGIN_USER_SUCCESS});
                dispatch({
                    type: SET_AUTH
                });
                dispatch({
                    type: SET_USER,
                    name: data.user.name,
                    email: data.user.email
                });
            } else {
                dispatch({
                    type: LOGIN_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: LOGIN_USER_FAILED,
                error: e
            });
        });
    };
}

export const unsetLogout: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        dispatch({type: UNSET_LOGOUT});
    }
}