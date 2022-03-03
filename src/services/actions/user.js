import { getUserRequest, updateUserRequest } from '../../utils/api';
import { SET_AUTH } from '../actions/auth';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export const GET_USER = 'GET_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const getUser = () => {
    return (dispatch) => {
        dispatch({ type: GET_USER });
        getUserRequest()
        .then(data => {
            if(data.success) {
                dispatch({type: GET_USER_SUCCESS});
                dispatch({
                    type: SET_USER,
                    name: data.user.name,
                    email: data.user.email
                });
                dispatch({
                    type: SET_AUTH
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
export const updateUser = (user) => {
    return (dispatch) => {
        dispatch({
        type: UPDATE_USER
        });

        updateUserRequest(user)
        .then(data => {
            if(data.success) {
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