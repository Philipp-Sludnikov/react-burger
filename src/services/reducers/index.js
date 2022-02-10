import { combineReducers } from 'redux';
import { 
    GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, 
    REMOVE_CONSTRUCTOR_ITEM, CALC_CONSTRUCTOR_TOTAL_PRICE, ADD_CONSTRUCTOR_INGREDIENT, ADD_BUN_CONSTRUCTOR_INGREDIENT, MOVE_CONSTRUCTOR_INGREDIENT,
    SHOW_MODAL_INGREDIENT, CLOSE_MODAL_INGREDIENT,
    SHOW_MODAL_ORDER, CLOSE_MODAL_ORDER, GET_ORDER_INFO, GET_ORDER_INFO_FAILED, GET_ORDER_INFO_SUCCESS
} from '../actions/index';

const ingredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredientsError: '',
    ingredients: [],
    
}

const constructorIngredientsState = {
    constructorIngredients: [],
    totalPrice: 0
}

const modalIngredientState = {
    visibleModalIngredient: false,
    currentViewedIngredient: {}
}

const modalOrderState = {
    orderInfoRequest: false,
    orderInfoFailed: false,
    visibleModalOrder: false,
    orderInfo: {}
}

const ingredientsList = (state = ingredientsState, action) => {
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

const constructorIngredientsList = (state = constructorIngredientsState, action) => {
    switch (action.type) {
        case CALC_CONSTRUCTOR_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: state.constructorIngredients.reduce(function (sum, currentValue) {
                    return sum + (currentValue.price * (currentValue.type === 'bun' ? 2 : 1));
                }, 0)
            }
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter(item => item.id !== action.id)
            }
        }
        case ADD_CONSTRUCTOR_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients, {id: Math.random().toString(16).slice(2), ...action.item}]
            }
        }
        case ADD_BUN_CONSTRUCTOR_INGREDIENT: {
            const bunIndex = state.constructorIngredients.findIndex(element => element.type === 'bun');
            if(bunIndex === -1) {
                return {
                    ...state,
                    constructorIngredients: [...state.constructorIngredients, {id: Math.random().toString(16).slice(2), ...action.bun}]
                }
            } else {
                return {
                    ...state,
                    constructorIngredients: [...state.constructorIngredients.filter(elem => elem.type !== 'bun'), {id: Math.random().toString(16).slice(2), ...action.bun}]
                }
            }

        }
        case MOVE_CONSTRUCTOR_INGREDIENT: {
            let currentIngredientsMoved = [...state.constructorIngredients];
            currentIngredientsMoved.splice(action.dragIndex, 1);
            currentIngredientsMoved.splice(action.hoverIndex, 0, state.constructorIngredients[action.dragIndex]);
            return {
                ...state,
                constructorIngredients: currentIngredientsMoved
            }
        }
        default: 
            return state;
    }
}

const modalIngredient = (state = modalIngredientState, action) => {
    switch (action.type) {
        case SHOW_MODAL_INGREDIENT: {
            return {
                ...state,
                currentViewedIngredient: action.ingredient,
                visibleModalIngredient: true
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

const modalOrder = (state = modalOrderState, action) => {
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
    modalOrder: modalOrder
}) 