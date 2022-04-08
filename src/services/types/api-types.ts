import { TIngredient, TOrderInfo } from "./burger-ingredients-types";

export type TCheckResponseData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  message: string;
  order: TOrderInfo;
  data: Array<TIngredient>
  user: TUserData;
}

export type TUserData = {
  name: string;
  email: string;
}

export type TGetUserRequestData = {
  success: boolean;
  message: string;
  user: TUserData;
}