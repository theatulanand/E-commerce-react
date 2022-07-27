import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

const initialState = {
    loading: false,
    error: false,
    token: null
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOGIN_LOADING:
            return {
                ...state,
                loading: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload
            }

        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        case LOGOUT_SUCCESS:
            return{
                initialState
            }

        default:
            return state;


    }
}