import React, {memo, useCallback} from 'react'
import {TodolistDomainType} from 'features/TodolistsList/model/todolists/todolistsSlice'
import {AddItemForm} from 'common/components'
import Paper from "@mui/material/Paper";
import {useActions} from "common/hooks/useActions";
import {TaskDomainType, tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import {FilterTasksButtons} from "features/TodolistsList/ui/Todolist/Todolist/FilterTasksButtons/FilterTasksButtons";
import s from './Todolist.module.css'
import {Tasks} from "features/TodolistsList/ui/Todolist/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/TodolistsList/ui/Todolist/Todolist/TodolistTitle/TodolistTitle";

type Props = {
  todolist: TodolistDomainType
  tasks: TaskDomainType[]
  demo?: boolean
}


export const Todolist = memo((props: Props) => {
  const {todolist, tasks, demo = false,} = props
  const {addTask} = useActions(tasksThunks)


  const addTaskCallback = useCallback(
    (title: string) => {
      return addTask({todolistId: todolist.id, title}).unwrap()
    },
    [addTask, todolist.id],
  )
  return (
    <Paper style={{padding: '10px', position: 'relative'}}>
      <TodolistTitle todolist={todolist}/>

      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityTodolistStatus === 'loading'}/>

      <div className={s.isPadding}>
        <Tasks tasks={tasks} todolist={todolist}/>
      </div>

      <div className={s.isPadding}>
        <FilterTasksButtons todolist={todolist}/>
      </div>
    </Paper>
  )
})
