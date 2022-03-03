import { SET_AUTH, UNSET_AUTH } from '../actions/auth';


const initialState = {
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: {
            return {
                ...state,
                isAuth: true,
            }
        }
        case UNSET_AUTH: {
            return {
                ...state,
                isAuth: false,
            }
        }
        default:
            return state;
    }
}