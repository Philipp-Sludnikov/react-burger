import { constructorIngredientsList, constructorIngredientsState, ingredientsList, ingredientsState, modalIngredient, modalIngredientState, modalOrder, modalOrderState } from '.';
import { constructorIngredients, ingredients, orderInfoResponse } from '../../utils/mockData';
import { ADD_BUN_CONSTRUCTOR_INGREDIENT, ADD_CONSTRUCTOR_INGREDIENT, CALC_CONSTRUCTOR_TOTAL_PRICE, CLOSE_MODAL_INGREDIENT, CLOSE_MODAL_ORDER, GET_INGREDIENTS, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_ORDER_INFO, GET_ORDER_INFO_FAILED, GET_ORDER_INFO_SUCCESS, MOVE_CONSTRUCTOR_INGREDIENT, REMOVE_CONSTRUCTOR_ITEM, RESET_CONSTRUCTOR, SET_VIEWED_INGREDIENT, SHOW_MODAL_INGREDIENT, SHOW_MODAL_ORDER } from '../actions';


describe('ingredientsList', () => {

    //Ingredients

    it('Ingredients List Initial State', () => {
        expect(ingredientsList(undefined, {} as any)).toEqual(ingredientsState);
    });

    it ('Get Ingredients', () => {
        const action = {
            type: GET_INGREDIENTS
        }
        expect(ingredientsList(ingredientsState, action)).toEqual({
            ...ingredientsState,
            ingredientsRequest: true
        })
    });

    it ('Get Ingredients Success', () => {
        const action = {
            type: GET_INGREDIENTS_SUCCESS,
            items: ingredients
        }
        expect(ingredientsList(ingredientsState, action)).toEqual({
            ...ingredientsState,
            ingredients: action.items,
            ingredientsRequest: false,
            ingredientsFailed: false
        })
    });

    it ('Get Ingredients Failed', () => {
        const action = {
            type: GET_INGREDIENTS_FAILED,
            error: 'Error'
        }
        expect(ingredientsList(ingredientsState, action)).toEqual({
            ...ingredientsState,
            ingredientsRequest: false,
            ingredientsFailed: true,
            ingredientsError: action.error
        })
    });

    //Constructor Ingredients
    it('Constructor Ingredients List Initial State', () => {
        expect(constructorIngredientsList(undefined, {} as any)).toEqual(constructorIngredientsState);
    });

    it ('Add Bun Constructor Ingredient', () => {
        const action = {
            type: ADD_BUN_CONSTRUCTOR_INGREDIENT,
            bun: ingredients[0], 
            id: 'b28fa9c88094a'
        }
        expect(constructorIngredientsList(constructorIngredientsState, action)).toEqual({
            ...constructorIngredientsState,
            constructorIngredients: [{...action.bun, id: action.id}]
        })
    });

    it ('Add Constructor Ingredient 1', () => {
        const action = {
            type: ADD_CONSTRUCTOR_INGREDIENT,
            item: ingredients[1], 
            id: '4094e9a9f9f43'
        }
        expect(constructorIngredientsList({...constructorIngredientsState, constructorIngredients: [constructorIngredients[0]]}, action)).toEqual({
            ...constructorIngredientsState,
            constructorIngredients: [constructorIngredients[0], constructorIngredients[1]]
        })
    });

    it ('Add Constructor Ingredient 2', () => {
        const action = {
            type: ADD_CONSTRUCTOR_INGREDIENT,
            item: ingredients[2], 
            id: '5bb1246e32613'
        }
        expect(constructorIngredientsList({...constructorIngredientsState, constructorIngredients: [constructorIngredients[0], constructorIngredients[1]]}, action)).toEqual({
            ...constructorIngredientsState,
            constructorIngredients: constructorIngredients
        })
    });

    it ('Remove Constructor Ingredient', () => {
        const action = {
            type: REMOVE_CONSTRUCTOR_ITEM,
            id: '5bb1246e32613'
        }
        expect(constructorIngredientsList({...constructorIngredientsState, constructorIngredients: constructorIngredients}, action)).toEqual({
            ...constructorIngredientsState,
            constructorIngredients: [constructorIngredients[0], constructorIngredients[1]]
        })
    });

    it ('Calc Constructor Total Price', () => {
        const action = {
            type: CALC_CONSTRUCTOR_TOTAL_PRICE
        }
        expect(constructorIngredientsList({...constructorIngredientsState, constructorIngredients: constructorIngredients}, action)).toEqual({
            ...constructorIngredientsState,
            constructorIngredients: constructorIngredients,
            totalPrice: 2680
        })
    });

    it ('Move Constructor Ingredient', () => {
        const action = {
            type: MOVE_CONSTRUCTOR_INGREDIENT,
            id: '5bb1246e32613',
            atIndex: 1
        }
        expect(constructorIngredientsList({...constructorIngredientsState, constructorIngredients: constructorIngredients}, action)).toEqual({
            ...constructorIngredientsState,
            constructorIngredients: [constructorIngredients[0], constructorIngredients[2], constructorIngredients[1]]
        })
    });

    it ('Reset Constructor', () => {
        const action = {
            type: RESET_CONSTRUCTOR
        }
        expect(constructorIngredientsList({...constructorIngredientsState, constructorIngredients: constructorIngredients}, action)).toEqual({
            ...constructorIngredientsState,
            constructorIngredients: []
        })
    });

    //Modal
    it('Modal Initial State', () => {
        expect(modalIngredient(undefined, {} as any)).toEqual(modalIngredientState);
    });

    it ('Show Ingredient Modal', () => {
        const action = {
            type: SHOW_MODAL_INGREDIENT,
            ingredient: ingredients[0]
        }
        expect(modalIngredient(modalIngredientState, action)).toEqual({
            ...modalIngredientState,
            currentViewedIngredient: action.ingredient,
            visibleModalIngredient: true
        })
    });

    it ('Set Viewed Ingredient', () => {
        const action = {
            type: SET_VIEWED_INGREDIENT,
            ingredient: ingredients[0]
        }
        expect(modalIngredient(modalIngredientState, action)).toEqual({
            ...modalIngredientState,
            currentViewedIngredient: action.ingredient,
        })
    });

    it ('Close Modal Ingredient', () => {
        const action = {
            type: CLOSE_MODAL_INGREDIENT
        }
        expect(modalIngredient({...modalIngredientState, currentViewedIngredient: action}, action)).toEqual({
            ...modalIngredientState,
            visibleModalIngredient: false,
            currentViewedIngredient: {}
        })
    });

    //Modal Order
    it('Modal Order Initial State', () => {
        expect(modalOrder(undefined, {} as any)).toEqual(modalOrderState);
    });

    it ('Get Order Info', () => {
        const action = {
            type: GET_ORDER_INFO
        }
        expect(modalOrder(modalOrderState, action)).toEqual({
            ...modalOrderState,
            orderInfoRequest: true
        })
    });

    it ('Get Order Info Success', () => {
        const action = {
            type: GET_ORDER_INFO_SUCCESS,
            orderInfo: orderInfoResponse
        }
        expect(modalOrder(modalOrderState, action)).toEqual({
            ...modalOrderState,
            orderInfoRequest: false,
            visibleModalOrder: true,
            orderInfo: action.orderInfo
        })
    });

    it ('Get Order Info Failed', () => {
        const action = {
            type: GET_ORDER_INFO_FAILED
        }
        expect(modalOrder(modalOrderState, action)).toEqual({
            ...modalOrderState,
            orderInfoRequest: false,
            orderInfoFailed: true,
            visibleModalOrder: true
        })
    });

    it ('Show Modal Order', () => {
        const action = {
            type: SHOW_MODAL_ORDER,
            ingredient: orderInfoResponse
        }
        expect(modalOrder({...modalOrderState, orderInfo: orderInfoResponse}, action)).toEqual({
            ...modalOrderState,
            orderInfo: action.ingredient,
            visibleModalOrder: true
        })

    });

    it ('Close Modal Order', () => {
        const action = {
            type: CLOSE_MODAL_ORDER
        }
        expect(modalOrder({...modalOrderState, orderInfo: orderInfoResponse}, action)).toEqual({
            ...modalOrderState,
            visibleModalOrder: false,
            orderInfo: {}
        })
    });
});

