import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";
import { Task } from "../../interfaces"
import ApiService from "../../../services/ApiService";


export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
    'fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await ApiService.get("tasks");
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Failed to fetch tasks.');
        }
    }
);

export const createTask = createAsyncThunk<string, Task, { rejectValue: string }>('createTasks', async (task, { rejectWithValue }) => {
    try {
        const response = await axios.post('/tasks/', task);
        console.log(response)
        return 'response';
    } catch (error) {
        return rejectWithValue("Failed to fetch issues.");
    }
})


