import axios from "axios"
import { ADD_CART, CART_ERROR, CART_LOADING, CLEAR_CART, DEC_CART, DELETE_ITEM_FROM_CART, GET_CART, INC_CART } from "./actionTypes"

export const cartLoading = () =>{
    return{
       type: CART_LOADING
    }
}

export const cartError = () =>{
    return{
       type: CART_ERROR
    }
}

export const getCart = (payload) =>{
    return{
        type: GET_CART,
        payload
    }
}

export const addCart = () =>{
    return{
       type: ADD_CART
    }
}

export const incCart = () =>{
    return{
       type: INC_CART
    }
}

export const decCart = () =>{
    return{
       type: DEC_CART
    }
}

export const clearCart = () =>{
    return{
        type: CLEAR_CART
    }
}

export const deleteItemFromCart = () =>{
    return{
       type: DELETE_ITEM_FROM_CART
    }
}

export const getCartItem = () => (dispatch) =>{
    dispatch(cartLoading())
    axios({
        method: "get",
        url : "http://localhost:3001/cart"
    }).then((res) =>{
        dispatch(getCart(res.data))
    }).catch((err) =>{
        dispatch(cartError());
    })
}