import { UNSET_USER } from './user';
import { UNSET_AUTH } from './auth';
import { checkResponse } from '../../utils/api';
import { deleteCookie } from '../../utils/cookie';
import { API_URL } from '../../utils/api';
import { AppDispatch, AppThunk } from '../types/types';

export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';
export const UNSET_LOGOUT: 'UNSET_LOGOUT' = 'UNSET_LOGOUT';
export const SET_LOGOUT: 'SET_LOGOUT' = 'SET_LOGOUT';
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';

export const logoutUser: AppThunk = (token: string) => {
    const logoutInfo = {
        token: token
    };
    return (dispatch: AppDispatch) => {
        dispatch({ type: LOGOUT_USER });

        fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(logoutInfo)
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                dispatch({type: LOGOUT_USER_SUCCESS});
                dispatch({type: UNSET_USER});
                dispatch({type: UNSET_AUTH});
                dispatch({type: SET_LOGOUT});

                
            } else {
                dispatch({
                    type: LOGOUT_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch((e: Error) => {
            dispatch({
                type: LOGOUT_USER_FAILED,
                error: e.message
            });
        });
    };
}