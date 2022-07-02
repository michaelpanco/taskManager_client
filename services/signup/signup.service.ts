import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../config/app';
import SignUpParams from './signupParams.interface';

interface Result {
    data: any[];
}

export const signup = createAsyncThunk('account/signup', async (params: SignUpParams, { rejectWithValue }) => {
    const url = `${apiUrl}/accounts`;

    try {
        const { data } = await axios.post<Result>(url, params);
        return data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
