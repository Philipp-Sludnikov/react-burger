import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_FEED, WS_CONNECTION_CLOSED } from "../actions/websocket";
import { AppDispatch, RootState } from "../types/types";

export const socketMiddleware = (): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
 
      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(payload);
      } else if(type === 'WS_CONNECTION_CLOSE') {
        if(socket) {
          socket.close();
        }
        
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = event => {
          const data = JSON.parse(event.data);
          dispatch({ type: WS_GET_FEED, payload: data });
        };

        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

      }

      next(action);
    };
  }
};