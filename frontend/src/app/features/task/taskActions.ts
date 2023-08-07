import { createAsyncThunk } from "@reduxjs/toolkit"
import { Task } from "../../interfaces"

export const createTask = createAsyncThunk<string, Task, { rejectValue: string }>('tasks/', async (task, { rejectWithValue }) => {
    try {
        // const response = await fetch("http://localhost:8000/api/task");
        // if (!response.ok) {
        //     throw new Error('Failed to fetch issues.');
        // }
        // const data = await response.json();
        console.log(task)
        return 'data as Task';
    } catch (error) {
        return rejectWithValue("Failed to fetch issues.");
    }
})


