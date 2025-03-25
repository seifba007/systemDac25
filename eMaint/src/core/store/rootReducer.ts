import { combineReducers } from 'redux';
import rootReducer from './modules/rootSlice';
import authReducer from './modules/authSlice';
import forgotPasswordReducer from './modules/forgotPasswordSlice';
import tokenReducer from './modules/tokenSlice';

const appReducer = combineReducers({
	root: rootReducer,
	token: tokenReducer,
	auth: authReducer,
	forgotPassword: forgotPasswordReducer,
});

export default appReducer;
