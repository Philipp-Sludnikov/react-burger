import { checkResponse } from '../../utils/api';
import { API_URL } from '../../utils/api';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

export const SET_RESTORE_PASS_STEP = 'SET_RESTORE_PASS_STEP';
export const SET_RESET_PASS_STEP = 'SET_RESET_PASS_STEP';

export const forgotPassword = (email) => {
    return (dispatch) => {
        dispatch({
            type: FORGOT_PASSWORD
        });

        fetch(`${API_URL}/api/auth/password-reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email})
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                dispatch({type: FORGOT_PASSWORD_SUCCESS});
                dispatch({
                    type: SET_RESTORE_PASS_STEP
                });
            } else {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: FORGOT_PASSWORD_FAILED,
                error: e.message
            });
        });
    };
}

export const resetPassword = (password, token) => {
    return (dispatch) => {
        dispatch({
            type: RESET_PASSWORD
        });

        fetch(`${API_URL}/api/auth/password-reset/reset`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({password: password, token: token})
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                dispatch({type: RESET_PASSWORD_SUCCESS});
                dispatch({
                    type: SET_RESET_PASS_STEP
                });
            } else {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: RESET_PASSWORD_FAILED,
                error: e.message
            });
        });
    };
}