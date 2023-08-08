import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers'
import ApiService from '../../services/ApiService';

ApiService.init("http://127.0.0.1:8000/api/")

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;