import { SET_USER } from '../actions/user';
import { SET_AUTH } from '../actions/auth';
import { checkResponse } from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { UNSET_LOGOUT } from '../actions/logout';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const loginUser = (email, password) => {
    const loginInfo = {
        email: email,
        password: password,
    };
    return (dispatch) => {
        dispatch({
        type: LOGIN_USER
        });

        fetch('https://norma.nomoreparties.space/api/auth/login', {
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

export const unsetLogout = () => {
    return (dispatch) => {
        dispatch({type: UNSET_LOGOUT});
    }
}