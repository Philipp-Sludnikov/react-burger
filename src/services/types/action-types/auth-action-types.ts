import { SET_AUTH, UNSET_AUTH } from '../../actions/auth'; 

export type TSetAuth = {
  type: typeof SET_AUTH;
}

export type TUnsetAuth = {
  type: typeof UNSET_AUTH;
}

export type TAuthActions = TSetAuth | TUnsetAuth;