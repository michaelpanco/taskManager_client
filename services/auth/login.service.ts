import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../config/app';
import LoginParams from './loginParams.interface';

interface Result {
    data: any[];
}

export const login = createAsyncThunk(
    'auth/login',
    async (params: LoginParams, { rejectWithValue }) => {
        const url = `${apiUrl}/auth/login`;

        try {
            const { data } = await axios.post<Result>(url, params);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);
