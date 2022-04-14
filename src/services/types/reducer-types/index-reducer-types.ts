import { TConstructorIngredient } from "../burger-constructor-types";
import { TIngredient } from "../burger-ingredients-types";

export type TIngredientsState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsError: string;
  ingredients: Array<TIngredient>;
}

export type TConstructorIngredientsState = {
  constructorIngredients: Array<TIngredient>;
  totalPrice: number;
}

export type TModalIngredientState = {
  visibleModalIngredient: boolean;
  currentViewedIngredient: TViewedIngredient;
}

export type TModalOrderState = {
  orderInfoRequest: boolean;
  orderInfoFailed: boolean;
  visibleModalOrder: boolean;
  orderInfo: {
    number?: number;
  };
}

export type TViewedIngredient = {
  _id?: string;
  name?: string;
  type?: string;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price?: number;
  image?: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
}