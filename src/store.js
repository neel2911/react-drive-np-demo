import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/Login';
import authReducer from './reducers/AuthReducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    authReducer: authReducer
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default store;