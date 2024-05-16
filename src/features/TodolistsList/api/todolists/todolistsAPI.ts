import {instance} from "common/api";
import {BaseResponseType} from "common/type";
import {AxiosResponse} from "axios";
import {
    CreateTodolistArgType,
    DeleteTodolistArgType,
    TodolistType, UpdateTodolistTitleArgType
} from "features/TodolistsList/api/todolists/todolistsAPI.types";

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
        // return instance.get<TodolistType[]>('todo-lists1')
    },
    createTodolist(arg: CreateTodolistArgType) {
        return instance.post<
            BaseResponseType<{ item: TodolistType }>,
            AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
            { title: string }
        >('todo-lists', {title: arg.title})
    },
    deleteTodolist(arg: DeleteTodolistArgType) {
        return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}`)
    },
    updateTodolistTitle(arg: UpdateTodolistTitleArgType) {
        return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, {
            title: string
        }>(`todo-lists/${arg.todolistId}`, {
            title: arg.title,
        })
    },
}

