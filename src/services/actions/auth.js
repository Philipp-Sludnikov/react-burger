import { checkResponse } from '../../utils/api';
import { setCookie } from '../../utils/cookie';

export const SET_AUTH = 'SET_AUTH';
export const UNSET_AUTH = 'UNSET_AUTH';

export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';

export const refreshToken = (token) => {
    const tokenInfo = {
        token: token,
    };
    return (dispatch) => {
        dispatch({
        type: REFRESH_TOKEN
        });

        fetch('https://norma.nomoreparties.space/api/auth/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(tokenInfo)
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                dispatch({type: REFRESH_TOKEN_SUCCESS});
                dispatch({
                    type: SET_AUTH,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                });
                setCookie('token', data.refreshToken);
            } else {
                dispatch({
                    type: REFRESH_TOKEN_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: REFRESH_TOKEN_FAILED,
                error: e.message
            });
        });
    };
}