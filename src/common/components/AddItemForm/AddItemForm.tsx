import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import {AddBox} from '@mui/icons-material'
import {BaseResponseType} from "common/type";
import {ResultCode} from "common/enum";

type Props = {
  disabled?: boolean
   addItem: (title: string) => Promise<unknown>
}

export const AddItemForm = memo(({ addItem, disabled }: Props) => {
  // console.log('AddItemForm called')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitleTask = e.currentTarget.value
    setTitle(newTitleTask)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }
  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title.trim())
          .then((res)=>{
              setTitle('')
          })
          .catch((err: BaseResponseType)=>{
              if(err.resultCode===ResultCode.Failed )
                  setError(err.messages[0])
          })
    } else {
      setError('Title is required')
    }
  }

  return (
    <div>
      <TextField
        error={!!error}
        label="Title"
        helperText={error}
        variant="outlined"
        size={'small'}
        style={{ maxWidth: '25vh'}}
        className={error ? 'error' : ''}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        disabled={disabled}
      />
      <IconButton
          color="primary"
          onClick={addItemHandler}
          disabled={disabled}
      style={{marginLeft:'5px'}}
      >
        <AddBox />
      </IconButton>
    </div>
  )
})
