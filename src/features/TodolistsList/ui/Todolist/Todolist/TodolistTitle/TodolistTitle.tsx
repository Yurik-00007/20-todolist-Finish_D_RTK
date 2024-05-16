import React, {memo, useCallback} from 'react';
import {EditableSpan} from "common/components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useActions} from "common/hooks/useActions";
import {TodolistDomainType, todolistsThunks} from "features/TodolistsList/model/todolists/todolistsSlice";
import s from './TodolistTitle.module.css'


type Props = {
  todolist: TodolistDomainType
}
export const TodolistTitle = memo(({todolist}: Props) => {
  const {id, title, entityTodolistStatus} = todolist
  const {removeTodolist, updateTodolist,} = useActions(todolistsThunks)
  const disabled = (entityTodolistStatus === 'loading')
  const removeTodolistHandler = () => removeTodolist({todolistId: id})

  const changeTodolistTitleCallback = useCallback(
    (title: string) => {
      return updateTodolist({todolistId: id, title}).unwrap()
    },
    [id],
  )

  return (
    <h3>
      <EditableSpan
        title={title}
        callBack={changeTodolistTitleCallback}
        disabled={disabled}
      />
      <IconButton
        onClick={removeTodolistHandler}
        size="large"
        disabled={disabled}
        className={s.iconButton}
      >
        <DeleteIcon/>
      </IconButton>
    </h3>
  );
})

