import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_MESSAGE, WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED } from '../../actions/websocket'; 
import { TFeedOrder } from '../feed-types';

export type TWebsocketPayload = {
  orders: Array<TFeedOrder>;
  total: number;
  totalToday: number;
}

export type TWSConnectionStart = {
  type: typeof WS_CONNECTION_START;
}

export type TWSConnectionSuccess = {
  type: typeof WS_CONNECTION_SUCCESS;
}

export type TWSConnectionError = {
  type: typeof WS_CONNECTION_ERROR;
}

export type TWSGetMessage = {
  type: typeof WS_GET_MESSAGE;
  payload: TWebsocketPayload;
}

export type TWSConnectionClose = {
  type: typeof WS_CONNECTION_CLOSE;
}

export type TWSConnectionClosed = {
  type: typeof WS_CONNECTION_CLOSED;
}

export type TWsActions = {
  wsStart: typeof WS_CONNECTION_START;
  wsOnSuccess: typeof WS_CONNECTION_SUCCESS;
  wsOnError: typeof WS_CONNECTION_ERROR;
  wsClose: typeof WS_CONNECTION_CLOSE;
  wsOnClosed: typeof WS_CONNECTION_CLOSED;
  wsOnMessage: typeof WS_GET_MESSAGE;
};

export type TMiddlewareAction = {
  type: string;
  url: string;
}

export type TWebsocketActions = TWSConnectionStart | TWSConnectionSuccess | TWSConnectionError | TWSGetMessage | TWSConnectionClose | TWSConnectionClosed;