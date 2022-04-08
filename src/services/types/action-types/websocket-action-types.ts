import { WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_GET_FEED, WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED } from '../../actions/websocket'; 
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

export type TWSGetFeed = {
  type: typeof WS_GET_FEED;
  payload: TWebsocketPayload;
}

export type TWSConnectionClose = {
  type: typeof WS_CONNECTION_CLOSE;
}

export type TWSConnectionClosed = {
  type: typeof WS_CONNECTION_CLOSED;
}

export type TWebsocketActions = TWSConnectionStart | TWSConnectionSuccess | TWSConnectionError | TWSGetFeed | TWSConnectionClose | TWSConnectionClosed;