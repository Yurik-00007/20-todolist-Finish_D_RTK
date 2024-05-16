import React, {memo} from 'react';
import Button from "@mui/material/Button";
import {useActions} from "common/hooks/useActions";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions
} from "features/TodolistsList/model/todolists/todolistsSlice";

type Props = {
  todolist: TodolistDomainType
}
export const FilterTasksButtons = memo(({todolist}: Props) => {
  const {id, filter} = todolist
  const {changeTodolistFilter} = useActions(todolistsActions)

  const changeTodolistFilterHandler = (todolistFilter: FilterValuesType) =>
    changeTodolistFilter({todolistId: id, todolistFilter})

  return (
    <>
      <Button
        variant={filter === 'all' ? 'outlined' : 'text'}
        onClick={() => changeTodolistFilterHandler('all')}
        size={'small'}
        color={'inherit'}>
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'text'}
        onClick={() => changeTodolistFilterHandler('active')}
        size={'small'}
        color={'primary'}>
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'text'}
        onClick={() => changeTodolistFilterHandler('completed')}
        size={'small'}
        color={'secondary'}>
        Completed
      </Button>
    </>

  );
});

