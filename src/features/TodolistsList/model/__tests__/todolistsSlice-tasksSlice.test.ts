import {
  TodolistDomainType,
  todolistsSlice,
  todolistsThunks
} from 'features/TodolistsList/model/todolists/todolistsSlice'
import {tasksSlice, TasksStateType} from 'features/TodolistsList/model/tasks/tasksSlice'
import {TodolistType} from "features/TodolistsList/api/todolists/todolistsAPI.types";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []
  const payload = {todolist: {id: 'todolistId3', title: 'New todolist', addedDate: '', order: 0}}
  type AddTodolistsAction = {
    type: string
    payload: {
      todolist: TodolistType
    }
  }
  const action: AddTodolistsAction = {
    type: todolistsThunks.addTodolist.fulfilled.type,
    payload,
  }

  const endTasksState = tasksSlice(startTasksState, action)
  const endTodolistsState = todolistsSlice(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)

})
