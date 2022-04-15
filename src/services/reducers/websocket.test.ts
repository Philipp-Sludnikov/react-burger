import { wsMessagePayload } from "../../utils/mockData";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../actions/websocket";
import { initialState, websocketReducer } from "./websocket";

describe('websocketReducer', () => {
    it('Initial State', () => {
        expect(websocketReducer(undefined, {} as any)).toEqual(initialState);
    });

    it('Websocket Connection Success', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS
        }
        expect(websocketReducer(initialState, action)).toEqual({
            ...initialState,
            isConnected: true
        })
    });

    it('Websocket Get Message', () => {
        const action = {
            type: WS_GET_MESSAGE,
            payload: wsMessagePayload
        }
        expect(websocketReducer(initialState, action)).toEqual({
            ...initialState,
            feedOrders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday
        })
    });

    it('Websocket Connection Closed', () => {
        const action = {
            type: WS_CONNECTION_CLOSED
        }
        expect(websocketReducer(initialState, action)).toEqual({
            ...initialState,
            isConnected: false
        })
    });
});

