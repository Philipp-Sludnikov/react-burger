import { WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_CONNECTION_CLOSED } from '../actions/websocket';
import { TWebsocketActions } from '../types/action-types/websocket-action-types';
import { TInitialState } from '../types/reducer-types/websocket-reducer-types';


const initialState: TInitialState = {
    isConnected: false,
    feedOrders: [],
    total: 0,
    totalToday: 0
};

export const websocketReducer = (state = initialState, action: TWebsocketActions): TInitialState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS: 
            return {
                ...state,
                isConnected: true
        }
        case WS_GET_MESSAGE: 
            return {
                ...state,
                feedOrders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
        }
        case WS_CONNECTION_CLOSED: 
            return {
                ...state,
                isConnected: false
        }
        default:
            return state;
    }
}