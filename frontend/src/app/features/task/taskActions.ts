import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";
import { Task } from "../../interfaces"

export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
    'fetchTasks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/tasks/');
            return response.data;
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
        const response = await fetch("http://localhost:8000/api/task");
        if (!response.ok) {
            throw new Error('Failed to fetch issues.');
        }
        const data = await response.json();
        console.log(task)
        return 'response';
    } catch (error) {
        return rejectWithValue("Failed to fetch issues.");
    }
})


