import { userReducer } from './user';
import { registerReducer } from './register';
import { authReducer } from './auth';
import { loginReducer } from './login';
import { logoutReducer } from './logout';
import { restorePasswordReducer } from './restore-password';
import { websocketReducer } from './websocket';
import { combineReducers } from 'redux';

import { 
    GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, 
    REMOVE_CONSTRUCTOR_ITEM, CALC_CONSTRUCTOR_TOTAL_PRICE, ADD_CONSTRUCTOR_INGREDIENT, ADD_BUN_CONSTRUCTOR_INGREDIENT, MOVE_CONSTRUCTOR_INGREDIENT, RESET_CONSTRUCTOR,
    SHOW_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT, SET_VIEWED_INGREDIENT,
    SHOW_MODAL_ORDER, CLOSE_MODAL_ORDER, GET_ORDER_INFO, GET_ORDER_INFO_FAILED, GET_ORDER_INFO_SUCCESS
} from '../actions/index';
import { TConstructorIngredientsState, TIngredientsState, TModalIngredientState, TModalOrderState } from '../types/reducer-types/index-reducer-types';
import { TIndexActions } from '../types/action-types/index-action-types';

export const ingredientsState: TIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsError: '',
    ingredients: [],
    
}

export const constructorIngredientsState: TConstructorIngredientsState = {
    constructorIngredients: [],
    totalPrice: 0
}

export const modalIngredientState: TModalIngredientState = {
    visibleModalIngredient: false,
    currentViewedIngredient: {}
}

export const modalOrderState: TModalOrderState = {
    orderInfoRequest: false,
    orderInfoFailed: false,
    visibleModalOrder: false,
    orderInfo: {}
}

export const ingredientsList = (state = ingredientsState, action: TIndexActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS : {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_FAILED : {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
                ingredientsError: action.error
            }
        }
        case GET_INGREDIENTS_SUCCESS : {
            return {
                ...state,
                ingredients: action.items,
                ingredientsRequest: false,
                ingredientsFailed: false
            }
        }
        default: 
            return state;
    }
}

export const constructorIngredientsList = (state = constructorIngredientsState, action: TIndexActions): TConstructorIngredientsState => {
    switch (action.type) {
        case CALC_CONSTRUCTOR_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: state.constructorIngredients.reduce(function (sum, currentValue) {
                    return sum + (currentValue.price * (currentValue.type === 'bun' ? 2 : 1));
                }, 0)
            }
        }

        case ADD_BUN_CONSTRUCTOR_INGREDIENT: {
            const bunIndex = state.constructorIngredients.findIndex(element => element.type === 'bun');
            if(bunIndex === -1) {
                return {
                    ...state,
                    constructorIngredients: [...state.constructorIngredients, {...action.bun, id: action.id}]
                }
            } else {
                return {
                    ...state,
                    constructorIngredients: [...state.constructorIngredients.filter(elem => elem.type !== 'bun'), {...action.bun, id: action.id}]
                }
            }

        }

        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, {...action.item, id: action.id}]
            }
        }

        case REMOVE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter(item => item.id !== action.id)
            }
        }

        case MOVE_CONSTRUCTOR_INGREDIENT: {
            const item = state.constructorIngredients.filter((element) => `${element.id}` === action.id)[0];
            const index = state.constructorIngredients.indexOf(item);
            let currentIngredientsMoved = [...state.constructorIngredients];
            currentIngredientsMoved.splice(index, 1);
            currentIngredientsMoved.splice(action.atIndex, 0, item);
            return {
                ...state,
                constructorIngredients: currentIngredientsMoved
            }
        }
        case RESET_CONSTRUCTOR: {
            return {
                ...state,
                constructorIngredients: []
            }
        }
        default: 
            return state;
    }
}

export const modalIngredient = (state = modalIngredientState, action: TIndexActions): TModalIngredientState => {
    switch (action.type) {
        case SHOW_MODAL_INGREDIENT: {
            return {
                ...state,
                currentViewedIngredient: action.ingredient,
                visibleModalIngredient: true
            }
        }
        case SET_VIEWED_INGREDIENT: {
            return {
                ...state,
                currentViewedIngredient: action.ingredient
            }
        }
        case CLOSE_MODAL_INGREDIENT: {
            return {
                ...state,
                visibleModalIngredient: false,
                currentViewedIngredient: {}
            }
        }
        default: 
            return state;
    }
}

export const modalOrder = (state = modalOrderState, action: TIndexActions): TModalOrderState => {
    switch (action.type) {
        case GET_ORDER_INFO: {
            return {
                ...state,
                orderInfoRequest: true
            }
        }
        case GET_ORDER_INFO_SUCCESS: {
            return {
                ...state,
                orderInfoRequest: false,
                visibleModalOrder: true,
                orderInfo: action.orderInfo
            }
        }
        case GET_ORDER_INFO_FAILED: {
            return {
                ...state,
                orderInfoRequest: false,
                orderInfoFailed: true,
                visibleModalOrder: true,
            }
        }
        case SHOW_MODAL_ORDER: {
            return {
                ...state,
                orderInfo: action.ingredient,
                visibleModalOrder: true
            }
        }
        case CLOSE_MODAL_ORDER: {
            return {
                ...state,
                visibleModalOrder: false,
                orderInfo: {}
            }
        }
        default: 
            return state;
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientsList,
    constructorIngredients: constructorIngredientsList,
    modalIngredient: modalIngredient,
    modalOrder: modalOrder,
    user: userReducer,
    register: registerReducer,
    auth: authReducer,
    login: loginReducer,
    logout: logoutReducer,
    restorePassword: restorePasswordReducer,
    websocketReducer: websocketReducer
}) 