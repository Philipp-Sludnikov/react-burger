import { rootReducer } from './reducers/index';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middleware/socketMiddleware';
import thunk from 'redux-thunk';
import { TWsActions } from './types/action-types/websocket-action-types';
import { WS_CONNECTION_CLOSE, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from './actions/websocket';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsActions:TWsActions = {
  wsStart: WS_CONNECTION_START,
  wsOnSuccess: WS_CONNECTION_SUCCESS,
  wsOnError: WS_CONNECTION_ERROR,
  wsClose: WS_CONNECTION_CLOSE,
  wsOnClosed: WS_CONNECTION_CLOSED,
  wsOnMessage: WS_GET_MESSAGE
}

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));

export const store = createStore(rootReducer, enhancer); 