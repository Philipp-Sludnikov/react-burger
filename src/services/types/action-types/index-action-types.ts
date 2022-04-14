import { 
  GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, 
  REMOVE_CONSTRUCTOR_ITEM, CALC_CONSTRUCTOR_TOTAL_PRICE, ADD_CONSTRUCTOR_INGREDIENT, ADD_BUN_CONSTRUCTOR_INGREDIENT, MOVE_CONSTRUCTOR_INGREDIENT, RESET_CONSTRUCTOR,
  SHOW_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT, SET_VIEWED_INGREDIENT,
  SHOW_MODAL_ORDER, CLOSE_MODAL_ORDER, GET_ORDER_INFO, GET_ORDER_INFO_FAILED, GET_ORDER_INFO_SUCCESS
} from '../../actions/index';
import { TConstructorIngredient } from '../burger-constructor-types';
import { TIngredient, TOrderInfo } from '../burger-ingredients-types';

//Ingredients

export type TGetIngredients = {
  type: typeof GET_INGREDIENTS;
}

export type TGetIngredientsFailed = {
  type: typeof GET_INGREDIENTS_FAILED;
  error: string;
}

export type TGetIngredientsSuccess = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  items: Array<TIngredient>
}

//Constructor

export type TRemoveConstructorItem = {
  type: typeof REMOVE_CONSTRUCTOR_ITEM;
  id: string;
}

export type TCalcConstructorTotalPrice = {
  type: typeof CALC_CONSTRUCTOR_TOTAL_PRICE;
}

export type TAddConstructorIngredient = {
  type: typeof ADD_CONSTRUCTOR_INGREDIENT;
  item: TIngredient;
  id: string;
}

export type TAddBunConstructorIngredient = {
  type: typeof ADD_BUN_CONSTRUCTOR_INGREDIENT;
  bun: TIngredient;
  id: string;
}

export type TMoveConstructorIngredient = {
  type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
  id: string;
  atIndex: number;
}

export type TResetConstructor = {
  type: typeof RESET_CONSTRUCTOR;
}

//Modal Ingredient

export type TShowModalIngredient = {
  type: typeof SHOW_MODAL_INGREDIENT;
  ingredient: TIngredient;
}

export type TCloseModalIngredient = {
  type: typeof CLOSE_MODAL_INGREDIENT;
}

export type TSetViewedIngredient = {
  type: typeof SET_VIEWED_INGREDIENT;
  ingredient: TIngredient;
}

//Modal Order

export type TShowModalOrder = {
  type: typeof SHOW_MODAL_ORDER;
  ingredient: {
    number: number;
  };
}

export type TCloseModalOrder = {
  type: typeof CLOSE_MODAL_ORDER;
}

export type TGetOrderInfo = {
  type: typeof GET_ORDER_INFO;
}

export type TGetOrderInfoFailed = {
  type: typeof GET_ORDER_INFO_FAILED;
}

export type TGetOrderInfoSuccess = {
  type: typeof GET_ORDER_INFO_SUCCESS;
  orderInfo: TOrderInfo
}

export type TIndexActions = 
TGetIngredients |
TGetIngredientsFailed |
TGetIngredientsSuccess |
TRemoveConstructorItem |
TCalcConstructorTotalPrice |
TAddConstructorIngredient |
TAddBunConstructorIngredient |
TMoveConstructorIngredient |
TResetConstructor |
TShowModalIngredient |
TCloseModalIngredient |
TSetViewedIngredient |
TShowModalOrder |
TCloseModalOrder |
TGetOrderInfo |
TGetOrderInfoFailed |
TGetOrderInfoSuccess;