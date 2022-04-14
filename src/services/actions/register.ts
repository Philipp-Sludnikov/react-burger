import { SET_USER } from './user';
import { SET_AUTH } from './auth';
import { checkResponse } from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { API_URL } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types/types';

export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';

export const registerUser: AppThunk = (email: string, password: string, name: string) => {
    const user = {
        email: email,
        password: password,
        name: name
    };
    return (dispatch: AppDispatch) => {
        dispatch({ type: REGISTER_USER });

        fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                setCookie('accessToken', data.accessToken);
                setCookie('refreshToken', data.refreshToken);
                dispatch({type: REGISTER_USER_SUCCESS});
                dispatch({
                    type: SET_USER,
                    name: data.user.name,
                    email: data.user.email
                });
                dispatch({
                    type: SET_AUTH,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                });
            } else {
                dispatch({
                    type: REGISTER_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch((e: Error) => {
            dispatch({
                type: REGISTER_USER_FAILED,
                error: e.message
            });
        });
    };
}