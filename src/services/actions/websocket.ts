import { AppDispatch, AppThunk } from "../types/types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_FEED: 'WS_GET_FEED' = 'WS_GET_FEED';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';

export const wsConnectionStart: AppThunk = (wsUrl: string) => {
    return (dispatch: AppDispatch) => {
        dispatch({type: WS_CONNECTION_START, payload: wsUrl});
    }
}

export const wsConnectionClose: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        dispatch({type: WS_CONNECTION_CLOSE});
    }
}