export type TErrorProps = {
  error: string;
}

export type TIngredientsRequest = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsError: string;
}

export type TOrderInfoRequest = {
  visibleModalOrder: boolean;
  orderInfo: {
    number: number;
  };
  orderInfoFailed: boolean;
  orderInfoRequest: boolean;
}

export type TUser = {
  name: string;
  email: string;
  getUserRequest: boolean;
  getUserError: string;
  updateUserRequest: boolean;
  updateUserFailed: boolean;
  updateUserError: string;
}

export type TFormValues = {
  name: string;
  email: string;
  password: string;
}