import { UNSET_USER } from '../actions/user';
import { UNSET_AUTH } from '../actions/auth';
import { checkResponse } from '../../utils/api';
import { deleteCookie } from '../../utils/cookie';

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const logoutUser = (token) => {
    const logoutInfo = {
        token: token
    };
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER
        });

        fetch('https://norma.nomoreparties.space/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(logoutInfo)
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                dispatch({type: LOGOUT_USER_SUCCESS});
                dispatch({type: UNSET_USER});
                dispatch({type: UNSET_AUTH});
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                window.location.href = '/login';
                
            } else {
                dispatch({
                    type: LOGOUT_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: LOGOUT_USER_FAILED,
                error: e.message
            });
        });
    };
}