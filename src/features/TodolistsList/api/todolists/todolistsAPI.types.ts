export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type DeleteTodolistArgType = {
    todolistId: string
}
export type CreateTodolistArgType = {
    title: string
}
export type UpdateTodolistTitleArgType = {
    todolistId: string
    title: string
}


