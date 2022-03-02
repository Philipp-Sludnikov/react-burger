import { checkResponse } from '../../utils/api';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export const GET_USER = 'GET_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const getUser = (token) => {
    return (dispatch) => {
        dispatch({
        type: GET_USER
        });

        fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': token
            },
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                dispatch({type: GET_USER_SUCCESS});
                dispatch({
                    type: SET_USER,
                    name: data.user.name,
                    email: data.user.email
                });
            } else {
                dispatch({
                    type: GET_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: GET_USER_FAILED,
                error: e.message
            });
        });
    };
}
export const updateUser = (token, user) => {
    return (dispatch) => {
        dispatch({
        type: UPDATE_USER
        });

        fetch('https://norma.nomoreparties.space/api/auth/user', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': token
            },
            body: JSON.stringify(user)
        })
        .then(checkResponse)
        .then(data => {
            if(data.success) {
                console.log(data);
                dispatch({type: UPDATE_USER_SUCCESS});
                dispatch({
                    type: SET_USER,
                    name: data.user.name,
                    email: data.user.email
                });
            } else {
                dispatch({
                    type: UPDATE_USER_FAILED,
                    error: data.message
                });
            }
        })
        .catch(e => {
            dispatch({
                type: UPDATE_USER_FAILED,
                error: e.message
            });
        });
    };
}