import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {tasksThunks} from 'features/TodolistsList/model/tasks/tasksSlice'
import {createAppAsyncThunk} from 'common/utils/create-app-async-thunk'
import {clearTasksAndTodolists} from 'common/actions'
import {RequestStatusType} from "app/model/appSlice";
import {ResultCode} from "common/enum";
import {
  CreateTodolistArgType,
  DeleteTodolistArgType,
  TodolistType, UpdateTodolistTitleArgType
} from "features/TodolistsList/api/todolists/todolistsAPI.types";
import {todolistsAPI} from "features/TodolistsList/api/todolists/todolistsAPI";

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; todolistFilter: FilterValuesType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) state[index].filter = action.payload.todolistFilter
    },
    changeEntityTodolistStatus: (
      state,
      action: PayloadAction<{ todolistId: string; entityTodolistStatus: RequestStatusType }>,
    ) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
      if (index !== -1) state[index].entityTodolistStatus = action.payload.entityTodolistStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodolists, (state, action) => {
        return action.payload.todolists
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.forEach((tl) =>
          state.push({...tl, filter: 'all', entityTodolistStatus: 'idle'}),
        )
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: 'all',
          entityTodolistStatus: 'idle',
        })
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
        if (index !== -1) state[index].title = action.payload.title
      })
  },
})

//thunk

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${slice.name}/fetchTodolists`,
  async (arg, thunkAPI) => {
    const {dispatch} = thunkAPI
    const res = await todolistsAPI.getTodolists()

    const todolists = res.data
    todolists.forEach((tl) => dispatch(tasksThunks.fetchTasks({todolistId: tl.id})))

    return {todolists: res.data}
  })


const removeTodolist = createAppAsyncThunk<DeleteTodolistArgType, DeleteTodolistArgType>(
  `${slice.name}/removeTodolist`,
  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(
      todolistsActions.changeEntityTodolistStatus({
        todolistId: arg.todolistId,
        entityTodolistStatus: 'loading'
      }),
    )

    const res = await todolistsAPI.deleteTodolist(arg)

      .finally(() => {
        dispatch(
          todolistsActions.changeEntityTodolistStatus({
            todolistId: arg.todolistId,
            entityTodolistStatus: 'idle'
          }),
        );
      })

    if (res.data.resultCode === ResultCode.Succeed) {
      return {todolistId: arg.todolistId}
    } else {
      return rejectWithValue(res.data)
    }
  })


const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, CreateTodolistArgType>(
  `${slice.name}/addTodolist`,
  async (arg, {rejectWithValue}) => {

    const res = await todolistsAPI.createTodolist(arg)

    if (res.data.resultCode === ResultCode.Succeed) {
      return {todolist: res.data.data.item}
    } else {
      return rejectWithValue(res.data)
    }
  })


const updateTodolist = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
  `${slice.name}/updateTodolist`,
  async (arg, {rejectWithValue}) => {

    const res = await todolistsAPI.updateTodolistTitle(arg)

    if (res.data.resultCode === ResultCode.Succeed) {
      return arg
    } else {
      return rejectWithValue(res.data)
    }
  })


export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist, updateTodolist}

//types

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityTodolistStatus: RequestStatusType
}

//export type InitialTodolistsStateType = ReturnType<typeof slice.getInitialState>
