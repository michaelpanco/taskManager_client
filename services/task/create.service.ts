import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../config/app';
import store from 'store2';

interface Result {
    data: any[];
}

export const createTask = createAsyncThunk('task/create', async (params: any, { rejectWithValue }) => {
    const url = `${apiUrl}/tasks`;

    try {
        const { data } = await axios.post<Result>(url, params, {
            headers: {
                Authorization: `Bearer ${store('jwt')}`
            }
        });

        return data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
