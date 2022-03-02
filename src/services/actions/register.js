import { SET_USER } from '../actions/user';
import { SET_AUTH } from '../actions/auth';
import { checkResponse } from '../../utils/api';
import { setCookie } from '../../utils/cookie';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const registerUser = (email, password, name) => {
    const user = {
        email: email,
        password: password,
        name: name
    };
    return (dispatch) => {
        dispatch({
        type: REGISTER_USER
        });

        fetch('https://norma.nomoreparties.space/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
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
                setCookie('token', data.refreshToken);
            } else {
                dispatch({
                    type: REGISTER_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: REGISTER_USER_FAILED,
                error: e.message
            });
        });
    };
}