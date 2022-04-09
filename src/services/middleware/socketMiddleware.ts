import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { TMiddlewareAction, TWsActions } from "../types/action-types/websocket-action-types";
import { AppDispatch, RootState } from "../types/types";

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TMiddlewareAction) => {

      const { dispatch } = store;
      const { type, url } = action;

      if (type === wsActions.wsStart && url) {
        socket = new WebSocket(url);
      } else if(type === wsActions.wsClose) {
        if(socket) {
          socket.close();
        }
      }

      if (socket) {
        socket.onopen = event => {
            dispatch({ type: wsActions.wsOnSuccess, payload: event });
        };

        socket.onerror = event => {
            dispatch({ type: wsActions.wsOnError, payload: event });
        };

        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            dispatch({ type: wsActions.wsOnMessage, payload: data });
        };

        socket.onclose = event => {
            dispatch({ type: wsActions.wsOnClosed, payload: event });
        };

    }

      next(action);
    };
  }
};