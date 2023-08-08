import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";
import { Task } from "../../interfaces"
import ApiService from "../../../services/ApiService";


export const fetchTasks = createAsyncThunk<Task[], void, { rejectValue: string }>('fetchTasks', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("tasks/");
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue('Failed to fetch tasks.');
    }
})

export const getTask = createAsyncThunk<Task, string, { rejectValue: string }>('getTask', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`tasks/${id}/`);
        console.log(data)
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Failed to get task.");
    }
})

export const createTask = createAsyncThunk<void, Task, { rejectValue: string }>('createTask', async (task, { rejectWithValue }) => {
    try {
        await axios.post("tasks/", task);
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Failed to create task.");
    }
})


export const updateTask = createAsyncThunk<void, Task, { rejectValue: string }>('updateTask', async (task, { rejectWithValue }) => {
    try {
        await axios.put(`tasks/${task.id}/`, task);
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Failed to update task.");
    }
})

export const deleteTask = createAsyncThunk<void, String, { rejectValue: string }>('deleteTask', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`tasks/${id}/`);
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Failed to delete task.");
    }
})
