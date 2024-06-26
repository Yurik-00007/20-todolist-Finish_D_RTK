import { combineReducers } from 'redux'
import { authSlice } from '../features/auth/model/authSlice'
import { appSlice } from './model/appSlice'
import { tasksSlice } from '../features/TodolistsList/model/tasks/tasksSlice'
import { todolistsSlice } from '../features/TodolistsList/model/todolists/todolistsSlice'

export const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  tasks: tasksSlice,
  todolists: todolistsSlice
})