import {AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction} from '@reduxjs/toolkit'
import {todolistsThunks} from "features/TodolistsList/model/todolists/todolistsSlice";
import {tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {authThunks} from "features/auth/model/authSlice";

const slice = createSlice({
    name: 'app',
    initialState: {
        //просходит ли сейчас взаимодействие с сервером
        status: 'loading' as RequestStatusType,
        //если прозойдет какая-то глобальная ошибка-мы запишем текст ошибки сюда
        error: null as null | string,
        //true когда приложение проинициализировалось(проверили юзера, получили настройки и т.д.)
        // isInitialized: false,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
            //return { ...state, error: action.error }
            state.error = action.payload.error
        },
    },
    extraReducers: builder => {
        builder

            .addMatcher(
                isPending,
                (state) => {
                    state.status = 'loading'
                }
            )
            .addMatcher(
                isFulfilled,
                (state) => {
                    state.status = 'succeeded'
                }
            )
            .addMatcher(
                isRejected,
                (state, action: AnyAction) => {
                    state.status = 'failed'
                    if (action.payload) {
                        if (action.type === todolistsThunks.addTodolist.rejected.type
                            || action.type === tasksThunks.addTask.rejected.type
                            || action.type === todolistsThunks.updateTodolist.rejected.type
                            || action.type === tasksThunks.updateTask.rejected.type
                            || action.type === authThunks.initializeApp.rejected.type
                        ) {
                            // 🚩Если попадаем во второй if, то ошибка будет локальная(под полем ввода)
                            return
                        };
                        state.error = action.payload.messages[0]
                    } else {
                        // 🚩Если попадаем сюда, то ошибка будет глобальная (ErrorSnackbar.tsx)
                        state.error = action.error.message ? action.error.message : 'Some error occurred'
                    }
                })

    }
})


export const appSlice = slice.reducer
export const appActions = slice.actions

//type
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = ReturnType<typeof slice.getInitialState>
