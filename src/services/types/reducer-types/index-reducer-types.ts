import { TConstructorIngredient } from "../burger-constructor-types";
import { TIngredient } from "../burger-ingredients-types";

export type TIngredientsState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredientsError: string;
  ingredients: Array<TIngredient>;
}

export type TConstructorIngredientsState = {
  constructorIngredients: Array<TConstructorIngredient>;
  totalPrice: number;
}

export type TModalIngredientState = {
  visibleModalIngredient: boolean;
  currentViewedIngredient: object;
}

export type TModalOrderState = {
  orderInfoRequest: boolean;
  orderInfoFailed: boolean;
  visibleModalOrder: boolean;
  orderInfo: object;
}