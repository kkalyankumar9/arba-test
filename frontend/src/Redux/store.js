import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Correct import for thunk
import { authReducer as AuthReducer,  } from "./Auth/reducer"

import { productsReducer as ProductsReducer } from "./Products/reducer"

const rootReducer = combineReducers({
  AuthReducer,
  ProductsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
