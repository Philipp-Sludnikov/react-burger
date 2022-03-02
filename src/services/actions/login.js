import { SET_USER } from '../actions/user';
import { SET_AUTH } from '../actions/auth';
import { checkResponse } from '../../utils/api';
import { setCookie } from '../../utils/cookie';

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
                dispatch({type: LOGIN_USER_SUCCESS});
                setCookie('token', data.refreshToken);
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
                    type: LOGIN_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: LOGIN_USER_FAILED,
                error: e.message
            });
        });
    };
}