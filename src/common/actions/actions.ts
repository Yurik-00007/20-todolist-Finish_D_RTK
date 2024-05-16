import {createAction} from "@reduxjs/toolkit";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolistsSlice";
import {TasksStateType} from "features/TodolistsList/model/tasks/tasksSlice";


export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>('common/clear-tasks-todolists')

//type
export type ClearTasksAndTodolistsType={
    todolists:TodolistDomainType[]
    tasks:TasksStateType
}
