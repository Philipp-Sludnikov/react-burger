import { store } from "../store";
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TAuthActions } from "./action-types/auth-action-types";
import { TLoginActions } from "./action-types/login-action-types";
import { TLogoutActions } from "./action-types/logout-action-types";
import { TUserActions } from "./action-types/user-action-types";
import { TIndexActions } from "./action-types/index-action-types";
import { TRegisterActions } from "./action-types/register-action-types";
import { TRestorePasswordActions } from "./action-types/restore-password-action-types";
import { TWebsocketActions } from "./action-types/websocket-action-types";

type TApplicationActions = TAuthActions | TLoginActions | TLogoutActions | TUserActions | TIndexActions | TRegisterActions | TRestorePasswordActions | TWebsocketActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;