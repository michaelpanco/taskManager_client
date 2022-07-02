import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/account/auth.slice';

const rootReducer = combineReducers({
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
