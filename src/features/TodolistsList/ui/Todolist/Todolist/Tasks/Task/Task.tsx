import React, {ChangeEvent, memo, useCallback} from 'react'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {EditableSpan} from 'common/components'
import {TaskStatuses} from 'common/enum/enum'
import {useActions} from "common/hooks/useActions";
import {TaskDomainType, tasksThunks} from "features/TodolistsList/model/tasks/tasksSlice";
import s from './Task.module.css'

type Props = {
  todolistId: string
  task: TaskDomainType
}

export const Task = memo((props: Props) => {
  const {todolistId, task} = props
  const {entityTaskStatus} = task

  const {removeTask, updateTask} = useActions(tasksThunks)

  const disabled = (entityTaskStatus === 'loading')
  const removeTaskHandler = () => {
    removeTask({todolistId, taskId: task.id})

  }
  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({todolistId, taskId: task.id, domainModel: {status},})
  }

  const changeTaskTitleCallback = useCallback(
    (title: string) => {
      return updateTask({todolistId, taskId: task.id, domainModel: {title},}).unwrap()
    },
    [todolistId, task.id],
  )
  return (
    <div className={s.taskStyle}>
      <div className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
        <Checkbox
          size="small"
          checked={task.status === TaskStatuses.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan title={task.title} callBack={changeTaskTitleCallback} disabled={disabled}/>
        <IconButton
          onClick={removeTaskHandler}
          aria-label="delete"
          size="small"
          disabled={disabled}
          style={{
            position: 'absolute',
            right: '1px',
            top: '1px',
          }}
        >
          <DeleteIcon fontSize={"small"}/>
        </IconButton>
      </div>
    </div>
  )
})

