import {RequestStatusType} from 'app/model/appSlice'
import {todolistsActions, todolistsThunks} from 'features/TodolistsList/model/todolists/todolistsSlice'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from 'common/utils/create-app-async-thunk'
import {clearTasksAndTodolists} from 'common/actions'
import {ResultCode} from 'common/enum/enum'
import {
  CreateTaskArgType,
  DeleteTaskArgType,
  GetTasksArgType,
  TaskType,
  UpdateTaskArgType
} from "features/TodolistsList/api/tasks/tasksAPI.types";
import {tasksAPI} from "features/TodolistsList/api/tasks/tasksAPI";

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityTaskStatus: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks[index].entityTaskStatus = action.payload.entityTaskStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })

      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          return (state[tl.id] = [])
        })
      })
      .addCase(clearTasksAndTodolists, (state, action) => {
        return action.payload.tasks
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        action.payload.tasks.forEach((t) => {
          return tasks.push({...t, entityTaskStatus: 'idle'})
        })
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift({...action.payload.task, entityTaskStatus: 'idle'})
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks[index] = {...tasks[index], ...action.payload.domainModel}
      })
  },

})

//thunk

const fetchTasks = createAppAsyncThunk<{
  tasks: TaskType[]; todolistId: string
}, GetTasksArgType>(
  `${slice.name}/fetchTasks`,
  async (arg, thunkAPI) => {
    const res = await tasksAPI.getTasks(arg)
    return {todolistId: arg.todolistId, tasks: res.data.items}
  })
// })


const removeTask = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI

    const res = await tasksAPI.deleteTask(arg)

      .finally(() => {
        dispatch(
          tasksActions.changeTaskEntityStatus({
            todolistId: arg.todolistId,
            taskId: arg.taskId,
            entityTaskStatus: 'idle',
          }))
      })

    if (res.data.resultCode === ResultCode.Succeed) {
      return arg
    } else {
      return rejectWithValue(res.data)
    }
  })

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgType>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(
      todolistsActions.changeEntityTodolistStatus({
        todolistId: arg.todolistId,
        entityTodolistStatus: 'loading'
      }),
    )

    const res = await tasksAPI.createTask(arg)

      .finally(() => {
        dispatch(
          todolistsActions.changeEntityTodolistStatus({
            todolistId: arg.todolistId,
            entityTodolistStatus: 'idle'
          }),
        )
      })

    if (res.data.resultCode === ResultCode.Succeed) {
      return {task: res.data.data.item}
    } else {
      return rejectWithValue(res.data)
    }
  })

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI
    const state = getState()

    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
    if (!task) {
      console.warn('Task has not been found in the state')
      return rejectWithValue(null)
    }

    const apiModel = {
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      status: task.status,
      ...arg.domainModel,
    }

    dispatch(
      tasksActions.changeTaskEntityStatus({
        todolistId: arg.todolistId,
        taskId: arg.taskId,
        entityTaskStatus: 'loading',
      }),
    )
    const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel)

      .finally(() => {
        dispatch(
          tasksActions.changeTaskEntityStatus({
            todolistId: arg.todolistId,
            taskId: arg.taskId,
            entityTaskStatus: 'failed',
          }))
      })


    if (res.data.resultCode === ResultCode.Succeed) {
      return arg
    } else {
      return rejectWithValue(res.data)
    }
  })


export const tasksSlice = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTasks, removeTask, addTask, updateTask}

//types
export type TaskDomainType = (TaskType & { entityTaskStatus: RequestStatusType })
export type TasksStateType = Record<string, TaskDomainType[]>



