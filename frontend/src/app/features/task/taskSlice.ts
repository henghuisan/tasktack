import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubTask, SubTaskFormData, Task, TaskFormData } from "../../interfaces"
import { createTask, deleteTask, fetchTasks, getTask, updateTask } from './taskActions';
import red from "@mui/material/colors/red";
import yellow from "@mui/material/colors/yellow";
import blue from "@mui/material/colors/blue";
import grey from "@mui/material/colors/grey";

export interface TaskState {
    task: Task;
    tasks: Task[];
    taskFormData: TaskFormData;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

export const PriorityColors: { [key: string]: string } = {
    High: red[500],
    Medium: yellow[700],
    Low: blue[600],
    default: grey[500],
};

const initialTaskFormState: TaskFormData = {
    title: "",
    note: null,
    priority: "None",
    category: "Inbox",
    completed: false,
    due_date: null,
    subtasks: [],
}

const initialSubTaskFormState: SubTaskFormData = {
    title: "",
    completed: false,
    subtasks: [],
}

const initialState: TaskState = {
    task: {} as Task,
    tasks: [],
    taskFormData: { ...initialTaskFormState },
    loading: 'idle',
    error: null
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        selectTask: (state, action) => {
            state.task = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.taskFormData.id = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.taskFormData.title = action.payload;
        },
        setNote: (state, action: PayloadAction<string>) => {
            state.taskFormData.note = action.payload;
        },
        setPriority: (state, action: PayloadAction<string | 'None'>) => {
            state.taskFormData.priority = action.payload;
        },
        setCategory: (state, action: PayloadAction<string | 'Inbox'>) => {
            state.taskFormData.category = action.payload;
        },
        setDueDate: (state, action: PayloadAction<string | null>) => {
        // setDueDate: (state, action) => {
            // state.taskFormData.due_date = new Date(action.payload);
            state.taskFormData.due_date  = action.payload
        },
        setCompleted: (state, action: PayloadAction<boolean>) => {
            state.taskFormData.completed = action.payload;
        },
        setSubtasks: (state, action: PayloadAction<SubTask>) => {
            // Assuming `action.payload` is an array of SubTask objects
            // You should directly replace the existing subtasks array
            state.task.subtasks.push(action.payload);
          },
          
        // setFormData: (state, action: PayloadAction<Task>) => {
        //     state.taskFormData = { ...action.payload };
        //     console.log(action.payload);

        // },
        resetForm: (state) => {
            state.taskFormData = { ...initialTaskFormState }
        }
    },
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
            .addCase(updateTask.fulfilled, (state, action) => {
                state.task = action.payload;
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

export const { selectTask, setId, setTitle, setNote, setPriority, setCategory, setCompleted, setDueDate, setSubtasks, resetForm } = taskSlice.actions;

export default taskSlice.reducer;