import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "../features/task/taskSlice"


const rootReducer = combineReducers({
    task: taskReducer,
})

export default rootReducer;