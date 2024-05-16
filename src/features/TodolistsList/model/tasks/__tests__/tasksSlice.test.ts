import {tasksActions, tasksSlice, TasksStateType, tasksThunks} from 'features/TodolistsList/model/tasks/tasksSlice'
import {v1} from 'uuid'
import {todolistsThunks} from 'features/TodolistsList/model/todolists/todolistsSlice'
import {TaskPriorities, TaskStatuses} from 'common/enum/enum'
import {DeleteTaskArgType, TaskType, UpdateTaskArgType} from "features/TodolistsList/api/tasks/tasksAPI.types";
import {DeleteTodolistArgType, TodolistType} from "features/TodolistsList/api/todolists/todolistsAPI.types";

let todolistId1: string
let todolistId2: string
let startState: TasksStateType

beforeEach(() => {
  todolistId1 = 'todolistId1'
  todolistId2 = 'todolistId2'
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  type RemoveTaskAction = {
    type: string
    payload: DeleteTaskArgType
  }

  const action: RemoveTaskAction = {
    type: tasksThunks.removeTask.fulfilled.type,
    payload: {
      taskId: '2',
      todolistId: 'todolistId2',
    },
  }

  const endState = tasksSlice(startState, action)

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        startDate: '',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        entityTaskStatus: 'idle',
      },
    ],
  })
  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(2)
  expect(endState['todolistId2'].every((t) => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
  const task = {
    todoListId: 'todolistId2',
    title: 'juce',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    startDate: '',
    description: '',
    order: 0,
    priority: 0,
    id: v1(),
  }
  type AddTaskAction = {
    type: string
    payload: {
      task: TaskType
    }
  }

  const action: AddTaskAction = {
    type: tasksThunks.addTask.fulfilled.type,
    payload: {
      task,
    },
  }
  const endState = tasksSlice(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const payload = {
    todolistId: 'todolistId2',
    taskId: '2',
    domainModel: {status: TaskStatuses.New},
  }
  /*
  //1 variant
  const action = tasksThunks.updateTask.fulfilled(payload,'requestId',payload)
*/
  //2
  type UpdateTaskAction = {
    type: string
    payload: UpdateTaskArgType
  }
  const action: UpdateTaskAction = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload,
  }

  const st = startState
  const endState = tasksSlice(st, action)

  expect(endState['todolistId2'][1].status).toBeDefined()
  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('entityTaskStatus of specified task should be changed', () => {
  const action = tasksActions.changeTaskEntityStatus({
    todolistId: todolistId1,
    taskId: '3',
    entityTaskStatus: 'succeeded',
  })

  const endState = tasksSlice(startState, action)

  expect(endState['todolistId1'][2].entityTaskStatus).toBeDefined()
  expect(endState['todolistId2'][2].entityTaskStatus).toBe('idle')
  expect(endState['todolistId1'][2].entityTaskStatus).toBe('succeeded')
})

test('title of specified task should be changed', () => {
  const payload = {todolistId: 'todolistId1', taskId: '3', domainModel: {title: 'Redux'}}
  type UpdateTaskAction = {
    type: string
    payload: UpdateTaskArgType
  }
  const action: UpdateTaskAction = {
    type: tasksThunks.updateTask.fulfilled.type,
    payload,
  }
  const endState = tasksSlice(startState, action)

  expect(endState['todolistId2'][2].title).toBe('tea')
  expect(endState['todolistId1'][2].title).toBe('Redux')
})

test('new array should be added when new todolist is added', () => {
  const payload = {todolist: {id: v1(), title: 'new todolist', addedDate: '', order: 0}}

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

  const endState = tasksSlice(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const payload = {todolistId: 'todolistId2'}
  type RemoveTodolistAction = {
    type: string
    payload: DeleteTodolistArgType
  }
  const action: RemoveTodolistAction = {
    type: todolistsThunks.removeTodolist.fulfilled.type,
    payload,
  }

  const endState = tasksSlice(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})

test('empty arrays should be added when we set todolists', () => {
  const todolists = [
    {id: '1', title: 'What to learn', addedDate: '', order: 0},
    {id: '2', title: 'What to buy', addedDate: '', order: 0},
  ]
  type FetchTodolistsActionType = {
    type: string
    payload: {
      todolists: TodolistType[]
    }
  }

  const action: FetchTodolistsActionType = {
    type: todolistsThunks.fetchTodolists.fulfilled.type,
    payload: {
      todolists,
    },
  }

  const endState = tasksSlice({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toBeDefined()
  expect(endState['2']).toBeDefined()
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})
test('tasks should be added for todolist', () => {
  type FetchTasksActionType = {
    type: string
    payload: {
      tasks: TaskType[]
      todolistId: string
    }
  }

  const action: FetchTasksActionType = {
    type: tasksThunks.fetchTasks.fulfilled.type,
    payload: {
      tasks: startState['todolistId1'],
      todolistId: 'todolistId1',
    },
  }
  const endState = tasksSlice(
    {
      todolistId1: [],
      todolistId2: [],
    },
    action,
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId2].length).toBe(0)
  expect(endState[todolistId1]).toEqual([
    {
      id: '1',
      title: 'CSS',
      status: TaskStatuses.New,
      todoListId: 'todolistId1',
      startDate: '',
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      entityTaskStatus: 'idle',
    },
    {
      id: '2',
      title: 'JS',
      status: TaskStatuses.Completed,
      todoListId: 'todolistId1',
      startDate: '',
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      entityTaskStatus: 'idle',
    },
    {
      id: '3',
      title: 'React',
      status: TaskStatuses.New,
      todoListId: 'todolistId1',
      startDate: '',
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      entityTaskStatus: 'idle',
    },
  ])
  expect(endState[todolistId2]).toStrictEqual([])
})
