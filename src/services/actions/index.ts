import { checkResponse } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import { TConstructorIngredient } from '../types/burger-constructor-types';
import { TIngredient } from '../types/burger-ingredients-types';
import { AppDispatch, AppThunk } from '../types/types';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';

export const GET_ORDER_INFO: 'GET_ORDER_INFO' = 'GET_ORDER_INFO';
export const GET_ORDER_INFO_FAILED: 'GET_ORDER_INFO_FAILED' = 'GET_ORDER_INFO_FAILED';
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' = 'GET_ORDER_INFO_SUCCESS';

export const GET_CONSTRUCTOR_INGREDIENTS: 'GET_CONSTRUCTOR_INGREDIENTS' = 'GET_CONSTRUCTOR_INGREDIENTS';
export const REMOVE_CONSTRUCTOR_ITEM: 'REMOVE_CONSTRUCTOR_ITEM' = 'REMOVE_CONSTRUCTOR_ITEM';
export const CALC_CONSTRUCTOR_TOTAL_PRICE: 'CALC_CONSTRUCTOR_TOTAL_PRICE' = 'CALC_CONSTRUCTOR_TOTAL_PRICE';
export const ADD_CONSTRUCTOR_INGREDIENT: 'ADD_CONSTRUCTOR_INGREDIENT' = 'ADD_CONSTRUCTOR_INGREDIENT';
export const MOVE_CONSTRUCTOR_INGREDIENT: 'MOVE_CONSTRUCTOR_INGREDIENT' = 'MOVE_CONSTRUCTOR_INGREDIENT';
export const ADD_BUN_CONSTRUCTOR_INGREDIENT: 'ADD_BUN_CONSTRUCTOR_INGREDIENT' = 'ADD_BUN_CONSTRUCTOR_INGREDIENT';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';

export const SHOW_MODAL_INGREDIENT: 'SHOW_MODAL_INGREDIENT' = 'SHOW_MODAL_INGREDIENT';
export const SET_VIEWED_INGREDIENT: 'SET_VIEWED_INGREDIENT' = 'SET_VIEWED_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT: 'CLOSE_MODAL_INGREDIENT' = 'CLOSE_MODAL_INGREDIENT';

export const SHOW_MODAL_ORDER: 'SHOW_MODAL_ORDER' = 'SHOW_MODAL_ORDER';
export const CLOSE_MODAL_ORDER: 'CLOSE_MODAL_ORDER' = 'CLOSE_MODAL_ORDER';

export const ADD_MODAL_INGREDIENT_INFO: 'ADD_MODAL_INGREDIENT_INFO' = 'ADD_MODAL_INGREDIENT_INFO';
export const REMOVE_MODAL_INGREDIENT_INFO: 'REMOVE_MODAL_INGREDIENT_INFO' = 'REMOVE_MODAL_INGREDIENT_INFO';

export const GET_ORDER_NUM: 'GET_ORDER_NUM' = 'GET_ORDER_NUM';


export const getIngredients: AppThunk = (url: string) => {
    return (dispatch: AppDispatch) => {
      dispatch({ type: GET_INGREDIENTS });
      fetch(url)
      .then(checkResponse)
      .then(data => {
        dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            items: data.data
          });
      })
      .catch((e: Error) => {
        dispatch({ type: GET_INGREDIENTS_FAILED, error: e.message});
      });
    };
  }

export const getOrderData:AppThunk = (url: string, items: Array<TIngredient>) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: GET_ORDER_INFO });

    let bunID = '';
    const ingredientsIDs = items.map(function(el) {
      if(el.type !== 'bun') {
        return el._id;
      } else {
        bunID = el._id;
        return el._id;
      }
    });

    if(bunID !== '') {
      ingredientsIDs.push(bunID);
    }

    const ingredientsReq = {
      'ingredients': ingredientsIDs
    }

    const accessToken = getCookie('accessToken');

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': `${accessToken}`
      },
      body: JSON.stringify(ingredientsReq)
      })
      .then(checkResponse)
      .then(data => {
        dispatch({
            type: GET_ORDER_INFO_SUCCESS,
            orderInfo: data.order
          });
        dispatch({
            type: RESET_CONSTRUCTOR
          });
      })
      .catch(e => {
        dispatch({
          type: GET_ORDER_INFO_FAILED,
          orderInfoError: e.message
        });
      });
    }
  };

export const calcTotalPrice = () => {
  return {
    type: CALC_CONSTRUCTOR_TOTAL_PRICE
  }
}

export const addConstructorIngredient = (item: TConstructorIngredient) => {
  if(item.type === 'bun') {
    return {
      type: ADD_BUN_CONSTRUCTOR_INGREDIENT,
      bun: item
    }
  } else {
    return {
      type: ADD_CONSTRUCTOR_INGREDIENT,
      item: item
    }
  }
}

export const moveConstructorIngredient = (id: string, atIndex: number) => {
  return {
    type: MOVE_CONSTRUCTOR_INGREDIENT,
    id: id,
    atIndex: atIndex
  }
}

export const removeConstructorIngredient = (id: string) => {
  return {
    type: REMOVE_CONSTRUCTOR_ITEM,
    id: id
  }
}

export const showModalIngredient = (ingredient: TIngredient) => {
  return {
    type: SHOW_MODAL_INGREDIENT,
    ingredient: ingredient
  }
}

export const setViewedIngredient = (ingredient: TIngredient) => {
  return {
    type: SET_VIEWED_INGREDIENT,
    ingredient: ingredient
  }
}

export const closeModalIngredient = () => {
  return {
    type: CLOSE_MODAL_INGREDIENT
  }
}

export const closeModalOrder = () => {
  return {
    type: CLOSE_MODAL_ORDER
  }
}
