import React, {memo} from 'react';
import {TaskStatuses} from "common/enum";
import {TodolistDomainType} from "features/TodolistsList/model/todolists/todolistsSlice";
import {TaskDomainType} from "features/TodolistsList/model/tasks/tasksSlice";
import {Task} from "features/TodolistsList/ui/Todolist/Todolist/Tasks/Task/Task";
import s from './Tasks.module.css'


type Props = {
  todolist: TodolistDomainType
  tasks: TaskDomainType[]
}

export const Tasks = memo(({tasks, todolist}: Props) => {
  const {filter, id} = todolist

  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter((task) => task.status === TaskStatuses.Completed)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter((task) => task.status === TaskStatuses.New)
  }

  return (
    <div>
      {tasksForTodolist.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            todolistId={id}
          />
        )
      })}
      {!tasks.length && <div className={s.createFirstTask}>Create your first task</div>}

    </div>
  );
})

