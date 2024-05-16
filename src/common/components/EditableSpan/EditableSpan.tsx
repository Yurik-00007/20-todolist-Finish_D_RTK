import React, {ChangeEvent, KeyboardEvent, memo, useRef, useState} from 'react'
import TextField from '@mui/material/TextField'

type Props = {
  disabled?: boolean
  title: string
  callBack: (title: string) => Promise<unknown>
}

export const EditableSpan = memo(({ title, callBack, disabled }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState<string>(title)
  const [error, setError] = useState<null | string>('')

  const inputRef = useRef<HTMLInputElement>(null);

  const activateEditMode = () => {
    setEditMode(true)
    setNewTitle(title)
  }
  const deActivateEditMode = () => {
    // if (newTitle.trim() !== '' && newTitle.length <= 100) {
    if (newTitle.trim() !== '') {
      // setEditMode(false)
      callBack(newTitle.trim())

          .then(() => {
            setEditMode(false)
          })
          .catch((err) => {
            setError(err.messages[0])
            if (inputRef.current) {
              inputRef.current.focus();
            }
          })
    } else {
      setError('Title is required.')
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }
  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      deActivateEditMode()
    }
  }
  return editMode ? (
    <TextField
      error={!!error}
      label="Title"
      helperText={error}
      id="outlined-basic"
      variant="outlined"
      size={'small'}
      style={{ maxWidth: '25vh' }}
      value={newTitle}
      autoFocus={true}
      onChange={changeTitleHandler}
      onBlur={deActivateEditMode}
      onKeyDown={keyDownHandler}
      className={'error'}
      disabled={disabled}
      inputRef={inputRef}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{newTitle}</span>
  )
  })