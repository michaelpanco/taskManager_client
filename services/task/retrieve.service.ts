import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl } from '../../config/app';
import store from 'store2';

interface Result {
    data: any[];
}

export const retrieveTask = createAsyncThunk('task/retrieve', async (params: any, { rejectWithValue }) => {
    const url = `${apiUrl}/tasks/${params.id}`;

    try {
        const { data } = await axios.get<Result>(url, {
            headers: {
                Authorization: `Bearer ${store('jwt')}`
            }
        });

        return data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});
