import { ADD_CART, CART_ERROR, CART_LOADING, CLEAR_CART, DEC_CART, DELETE_ITEM_FROM_CART, GET_CART, INC_CART } from "./actionTypes";

const initialState = {
    loading: false,
    error: false,
    cart: []
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CART_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }

        case CART_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        case GET_CART:
            return {
                ...state,
                loading: false,
                error: false,
                cart: payload
            }

        case ADD_CART:
            return {
                ...state,
                loading: false,
                error: false
            }

        case INC_CART:
            return {
                ...state,
                loading: false,
                error: false
            }

        case DEC_CART:
            return {
                ...state,
                loading: false,
                error: false
            }

        case DELETE_ITEM_FROM_CART:
            return {
                ...state,
                loading: false,
                error: false
            }

        case CLEAR_CART:
            return {
                ...state,
                loading: false,
                error: false
            }

        default:
            return state;
    }
}