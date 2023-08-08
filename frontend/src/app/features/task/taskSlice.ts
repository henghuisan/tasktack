import { createSlice } from '@reduxjs/toolkit';
import { Task } from "../../interfaces"
import { createTask, deleteTask, fetchTasks, getTask, updateTask } from './taskActions';

export interface TaskState {
    task: Task;
    tasks: Task[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TaskState = {
    task: {} as Task,
    tasks: [],
    loading: 'idle',
    error: null
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.loading = 'succeeded';
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to fetch tasks';
            })
            .addCase(getTask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.task = action.payload;
                state.loading = 'succeeded';
            })
            .addCase(getTask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to get task';
            })
            .addCase(createTask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                console.log(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to create task';
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to update task';
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.payload || 'Failed to delete task';
            })
    }
})

export default taskSlice.reducer;