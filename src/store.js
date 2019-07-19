import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import File from './reducers/File';
import Auth from './reducers/Auth';

const rootReducer = combineReducers({
    fileReducer: File,
    authReducer: Auth
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default store;