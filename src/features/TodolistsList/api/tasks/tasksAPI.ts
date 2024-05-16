import {instance} from "common/api";
import {BaseResponseType} from "common/type";
import {AxiosResponse} from "axios";
import {
    CreateTaskArgType, DeleteTaskArgType,
    GetTasksArgType,
    GetTasksResponseType, TaskType,
    UpdateTaskModelType
} from "features/TodolistsList/api/tasks/tasksAPI.types";

export const tasksAPI = {
    getTasks(arg: GetTasksArgType) {
        return instance.get<GetTasksResponseType>(`todo-lists/${arg.todolistId}/tasks`)
    },
    createTask(arg: CreateTaskArgType) {
        return instance.post<
            BaseResponseType<{ item: TaskType }>,
            AxiosResponse<BaseResponseType<{ item: TaskType }>>,
            { title: string }
        >(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title })
    },
    deleteTask(arg: DeleteTaskArgType) {
        return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<
            BaseResponseType<{ item: TaskType }>,
            AxiosResponse<BaseResponseType<{ item: TaskType }>>,
            UpdateTaskModelType
        >(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

