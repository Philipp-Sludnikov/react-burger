import { SET_AUTH, UNSET_AUTH } from '../actions/auth';
import { TAuthActions } from '../types/action-types/auth-action-types';
import { TInitialState } from '../types/reducer-types/auth-reducer-types';


const initialState: TInitialState = {
    isAuth: false,
};

export const authReducer = (state = initialState, action: TAuthActions): TInitialState => {
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