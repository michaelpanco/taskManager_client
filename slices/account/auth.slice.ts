import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        message: ''
    },
    reducers: {
        showError(state, action) {
            state.message = action.payload.message;
        }
    }
});

export default authSlice.reducer;
