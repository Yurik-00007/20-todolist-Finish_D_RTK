import React from 'react'
import { Provider } from 'react-redux'
import {AppRootStateType} from 'app/store'
import { combineReducers } from 'redux'
import { todolistsSlice } from 'features/TodolistsList/model/todolists/todolistsSlice'
import { tasksSlice } from 'features/TodolistsList/model/tasks/tasksSlice'
import { appSlice } from 'app/model/appSlice'
import { authSlice } from 'features/auth/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import {  HashRouter } from 'react-router-dom'
import { TaskPriorities, TaskStatuses } from 'common/enum/enum'

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  tasks: tasksSlice,
  todolists: todolistsSlice,
})

const initialGlobalState: AppRootStateType = {
  app: {
    status: 'succeeded',
    error: null,

  },
  auth: {
    isLoggedIn: true,
    isInitialized: true,
    captchaUrl: null,
  },
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityTodolistStatus: 'idle',
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityTodolistStatus: 'loading',
    },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: '1',
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
    ],
    ['todolistId2']: [
      {
        id: '3',
        title: 'Milk',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '4',
        title: 'React Book',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
    ],
  },
}

// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))
export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  //не работает
  // middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
  return <HashRouter>{storyFn()}</HashRouter>
}
