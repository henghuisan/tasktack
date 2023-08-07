import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from "../../interfaces"
import { createTask } from './taskActions';

export interface TaskState {
    tasks: Task[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TaskState = {
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
            .addCase(createTask.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                // state.movies = action.payload;
                // state.loading = false;
                // state.error = null;
                console.log(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message || 'Failed to fetch movies';
            })
    }
})

export default taskSlice.reducer;