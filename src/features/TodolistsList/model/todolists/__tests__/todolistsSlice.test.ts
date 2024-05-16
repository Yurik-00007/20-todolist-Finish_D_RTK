import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
  todolistsSlice,
  todolistsThunks,
} from 'features/TodolistsList/model/todolists/todolistsSlice'
import {v1} from 'uuid'
import {RequestStatusType} from 'app/model/appSlice'
import {
  DeleteTodolistArgType,
  TodolistType,
  UpdateTodolistTitleArgType
} from "features/TodolistsList/api/todolists/todolistsAPI.types";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
  todolistId1 = 'todolistId1'
  todolistId2 = 'todolistId2'
  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityTodolistStatus: 'idle'},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityTodolistStatus: 'idle'},
  ]
})

test('correct todolist should be removed', () => {
  const payload = {todolistId: todolistId1}
  type RemoveTodolistsAction = {
    type: string
    payload: DeleteTodolistArgType
  }

  const action: RemoveTodolistsAction = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload,
  }

  const endState = todolistsSlice(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  let newTodolistTitle = 'New TodolistWithState'
  const payload = {
    todolist: {id: v1(), title: newTodolistTitle, addedDate: '', order: 0},
  }
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

  const endState = todolistsSlice(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New TodolistWithState'
  const payload = {todolistId: todolistId2, title: newTodolistTitle}
  type UpdateTodolistAction = {
    type: string
    payload: UpdateTodolistTitleArgType
  }
  const action: UpdateTodolistAction = {
    type: todolistsThunks.updateTodolist.fulfilled.type,
    payload,
  }

  const endState = todolistsSlice(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterValuesType = 'completed'
  const endState = todolistsSlice(
    startState,
    todolistsActions.changeTodolistFilter({todolistId: todolistId2, todolistFilter: newFilter}),
  )

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolist should be added to the state', () => {
  type FetchTodolistsAction = {
    type: string
    payload: {
      todolists: TodolistType[]
    }
  }
  const action: FetchTodolistsAction = {
    type: todolistsThunks.fetchTodolists.fulfilled.type,
    payload: {
      todolists: startState,
    },
  }

  const endState = todolistsSlice([], action)

  expect(endState.length).toBe(2)
})

test('correct entityTodolistStatus of todolist should be changed', () => {
  let newEntityStatus: RequestStatusType = 'loading'
  const endState = todolistsSlice(
    startState,
    todolistsActions.changeEntityTodolistStatus({todolistId: todolistId2, entityTodolistStatus: newEntityStatus}),
  )

  expect(endState[0].filter).toBe('all')
  expect(endState[1].entityTodolistStatus).toBe(newEntityStatus)
})
