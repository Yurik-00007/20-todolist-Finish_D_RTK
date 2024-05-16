import React, { useEffect, useState } from 'react'
import {tasksAPI} from "features/TodolistsList/api/tasks/tasksAPI";
import {todolistsAPI} from "features/TodolistsList/api/todolists/todolistsAPI";
import {UpdateDomainTaskModelType, UpdateTaskModelType} from "features/TodolistsList/api/tasks/tasksAPI.types";

export default {
  title: 'API',
}


export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    todolistsAPI
      .getTodolists()
      .then((res) => {
        // debugger
        setCount(res.data.length)
        setState(res.data)
      })
  }, [])
  return (
    <div>
      <div>
        <h1>Amount:{count}</h1>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistTitle, setTodolistTitle] = useState<string>('')


  const createTodolist = () => {
    todolistsAPI.createTodolist({ title: todolistTitle }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      <div>
        <input
          placeholder={'todolistTitle'}
          value={todolistTitle}
          onChange={(e) => {
            setTodolistTitle(e.currentTarget.value)
          }}
        />
        <button onClick={createTodolist}>create todolist</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')


  const deleteTodolist = () => {
    todolistsAPI.deleteTodolist({ todolistId }).then((res) => {
      // debugger
      setState(res.data)
    })
  }

  return (
    <div>
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTodolist}>delete todolist</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [todolistTitle, setTodolistTitle] = useState<string>('')


  const updateTodolist = () => {
    todolistsAPI.updateTodolistTitle({ todolistId, title: todolistTitle }).then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'todolistTitle'}
          value={todolistTitle}
          onChange={(e) => {
            setTodolistTitle(e.currentTarget.value)
          }}
        />
        <button onClick={updateTodolist}>update todolist</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')
  const [count, setCount] = useState(0)
  const getTasks = () => {
    tasksAPI.getTasks({ todolistId }).then((res) => {
      // debugger
      setCount(res.data.totalCount)
      setState(res.data)
    })
  }

  return (
    <div>
      <div>
        <h1>Amount:{count}</h1>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <button onClick={getTasks}>get tasks for this todolist</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}
export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const createTask = () => {
    tasksAPI.createTask({ todolistId, title: taskTitle }).then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'taskTitle'}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value)
          }}
        />
        <button onClick={createTask}>create task</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}
export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    tasksAPI
      .deleteTask({ todolistId, taskId })
      // axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
      .then((res) => {
        // debugger
        setState(res.data)
      })
  }

  return (
    <div>
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'taskId'}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTask}>delete task</button>
      </div>
      {JSON.stringify(state)}
    </div>
  )
}
export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')
  const [taskTitle, setTaskTitle] = useState<string>('')
  const getTasks = () => {
    tasksAPI.getTasks({ todolistId }).then((res) => {
      setState(res.data.items)
    })
  }
  useEffect(() => {
    if (taskId.trim() !== '' && todolistId.trim() !== '' && state === null) {
      getTasks()
    }
  }, [taskId, todolistId, state])

  const updateTask = () => {
    if (state) {
      // console.log(state)
      const task = state.find((t: any) => t.id === taskId)
      if (!task) {
        throw new Error('Task has been not found in the state')
      }
      const module: UpdateDomainTaskModelType = {
        title: taskTitle,
      }

      const apiModel: UpdateTaskModelType = {
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        ...module,
      }
      tasksAPI.updateTask(todolistId, taskId, apiModel).then((res) => {
        setState(res.data)
      })
    }
  }

  return (
    <div>
      <div>
        <input
          placeholder={'todolistId'}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'taskId'}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={'taskTitle'}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value)
          }}
        />
        <button onClick={updateTask}>update task</button>
      </div>
      {taskTitle && JSON.stringify(state)}
    </div>
  )
}
