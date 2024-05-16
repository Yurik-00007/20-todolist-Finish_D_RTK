import {TaskPriorities, TaskStatuses} from "common/enum";

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type GetTasksArgType = {
    todolistId: string
}
export type DeleteTaskArgType = {
    todolistId: string
    taskId: string
}
export type CreateTaskArgType = {
    todolistId: string
    title: string
}
export type UpdateTaskArgType = {
    todolistId: string
    taskId: string
    domainModel: UpdateDomainTaskModelType
}