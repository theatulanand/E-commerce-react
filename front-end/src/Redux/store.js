import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer} from "./Auth/reducer";
import { reducer as cartReducer } from "./Cart/reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    cartStore : cartReducer
})

export const store = createStore(rootReducer, compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))