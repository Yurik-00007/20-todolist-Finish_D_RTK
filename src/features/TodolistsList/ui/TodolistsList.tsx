import React, {memo, useCallback, useEffect} from 'react'
import {useAppSelector} from 'app/store'
import {TodolistDomainType, todolistsThunks} from 'features/TodolistsList/model/todolists/todolistsSlice'
import {TasksStateType} from 'features/TodolistsList/model/tasks/tasksSlice'
import Grid from '@mui/material/Grid'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {selectTodolists} from 'features/TodolistsList/model/todolists/todolistsSelectors'
import {selectTasks} from 'features/TodolistsList/model/tasks/tasksSelectors'
import {selectAuthIsLoggedIn} from 'features/auth/model/authSelectors'
import {AddItemForm} from 'common/components'
import {useActions} from "common/hooks/useActions";
import Paper from "@mui/material/Paper";

type Props = {
  demo?: boolean
}
export const TodolistsList = memo(({demo = false}: Props) => {
  const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists)
  const tasks = useAppSelector<TasksStateType>(selectTasks)
  const isLoggedIn = useAppSelector<boolean>(selectAuthIsLoggedIn)

  const {fetchTodolists, addTodolist} = useActions(todolistsThunks)


  useEffect(() => {
    if (!isLoggedIn || demo) {
      return
    }
    fetchTodolists()
  }, [])


  const addTodolistCallback = useCallback(
    (title: string) => {
      return addTodolist({title}).unwrap()
    },
    [],
  )


  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }
  return (
    <>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm addItem={addTodolistCallback}/>
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((todolist) => {
          let tasksForTodolist = tasks[todolist.id]

          return (
            <Grid style={{margin: '0px auto'}} item key={todolist.id}>
              <div style={{minWidth: '35vh'}}>
                <Paper style={{padding: "10px"}}>
                  <Todolist
                    tasks={tasksForTodolist}
                    todolist={todolist}
                    demo={demo}
                  />
                </Paper>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
})
