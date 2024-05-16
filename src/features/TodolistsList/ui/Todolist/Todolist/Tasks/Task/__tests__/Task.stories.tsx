import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Task} from 'features/TodolistsList/ui/Todolist/Todolist/Tasks/Task/Task'
import {useState} from 'react'
import {TaskPriorities, TaskStatuses} from 'common/enum/enum'
import {TaskDomainType} from "features/TodolistsList/model/tasks/tasksSlice";

const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    // changeTaskStatus: action('Status changed inside Task'),
    // changeTaskTitle: action('Title changed inside Task'),
    // removeTask: action('Remove Button clicked changed inside Task'),
    task: {
      id: '1',
      title: 'HTML&CSS',
      status: TaskStatuses.Completed,
      todoListId: 'todolistId1',
      startDate: '',
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      entityTaskStatus:"idle",
    },
    todolistId: 'todolistId1',
  },
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
  args: {
    task: {
      id: '2',
      title: 'JS',
      status: TaskStatuses.New,
      todoListId: 'todolistId1',
      startDate: '',
      addedDate: '',
      deadline: '',
      description: '',
      order: 0,
      priority: TaskPriorities.Low,
      entityTaskStatus:"idle",
    },
  },
}

const TaskToggle = () => {
  const [task, setTask] = useState<TaskDomainType>({
    id: '2',
    title: 'JS',
    status: TaskStatuses.New,
    todoListId: 'todolistId1',
    startDate: '',
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: TaskPriorities.Low,
    entityTaskStatus: 'idle',
  })
  return (
    <Task
      /*changeTaskStatus={() =>
        setTask({ ...task, status: task.status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New })
      }*/
      // changeTaskTitle={(todolistId:string, taskId:string, title:string) => setTask({ ...task, title: title })}
      // removeTask={action('Task has been removed')}
      todolistId={'todolistId1'}
      task={task}
      // disabled={true}
    />
  )
}

export const TaskToggleStory: Story = {
  render: () => <TaskToggle />,
}
