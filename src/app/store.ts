import {tasksSlice} from 'features/TodolistsList/model/tasks/tasksSlice'
import {todolistsSlice} from 'features/TodolistsList/model/todolists/todolistsSlice'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {appSlice} from 'app/model/appSlice'
import {authSlice} from 'features/auth/model/authSlice'
import {configureStore} from '@reduxjs/toolkit'


export const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    auth: authSlice,
    app: appSlice,
    tasks: tasksSlice,
    todolists: todolistsSlice,
  },
})


export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
